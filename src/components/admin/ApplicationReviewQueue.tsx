import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ApplicationReviewCard from './ApplicationReviewCard';

const ApplicationReviewQueue = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'under_review' | 'approved' | 'rejected'>('submitted');

  const fetchApplications = async () => {
    try {
      let query = supabase
        .from('applications')
        .select(`
          *,
          properties (*),
          profiles (*)
        `)
        .order('submitted_at', { ascending: false });

      // Apply status filter
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      } else {
        // For 'all', exclude draft applications
        query = query.neq('status', 'draft');
      }

      const { data, error } = await query;

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchApplications();
  }, [statusFilter]);

  useEffect(() => {
    // Subscribe to real-time updates
    const channel = supabase
      .channel('application-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications',
        },
        () => {
          fetchApplications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusCount = (status: string) => {
    if (status === 'all') {
      return applications.length;
    }
    return applications.filter(app => app.status === status).length;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Application Review Queue
            </CardTitle>
            <CardDescription>Review and manage submitted applications</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={statusFilter} onValueChange={(val) => setStatusFilter(val as any)} className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="submitted" className="relative">
              Pending
              {getStatusCount('submitted') > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center" variant="destructive">
                  {getStatusCount('submitted')}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="under_review" className="relative">
              In Review
              {getStatusCount('under_review') > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {getStatusCount('under_review')}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
            </TabsTrigger>
            <TabsTrigger value="all">
              All
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No applications found</p>
              <p className="text-sm">
                {statusFilter === 'submitted' 
                  ? 'No applications awaiting review at this time'
                  : `No ${statusFilter === 'all' ? '' : statusFilter} applications found`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <ApplicationReviewCard
                  key={application.id}
                  application={application}
                  onStatusUpdate={fetchApplications}
                />
              ))}
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationReviewQueue;
