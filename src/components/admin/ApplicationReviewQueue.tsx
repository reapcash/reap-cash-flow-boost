import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2, Filter, Search, SlidersHorizontal, ArrowUpDown, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ApplicationReviewCard from './ApplicationReviewCard';

const ApplicationReviewQueue = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'under_review' | 'approved' | 'rejected'>('submitted');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [applicantTypeFilter, setApplicantTypeFilter] = useState<string>('all');
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 500000]);

  const fetchApplications = async () => {
    try {
      let query = supabase
        .from('applications')
        .select(`
          *,
          properties (*)
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

      // Hydrate profiles without a direct FK relationship
      const userIds = Array.from(new Set((data || []).map((app: any) => app.user_id).filter(Boolean)));
      let profilesMap: Record<string, any> = {};
      if (userIds.length) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', userIds);
        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
        } else {
          profilesMap = Object.fromEntries((profilesData || []).map((p: any) => [p.id, p]));
        }
      }

      const hydrated = (data || []).map((app: any) => ({ ...app, profiles: profilesMap[app.user_id] || null }));
      setApplications(hydrated);
      applyFiltersAndSort(hydrated);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = (apps: any[]) => {
    let filtered = [...apps];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.profiles?.full_name?.toLowerCase().includes(query) ||
        app.profiles?.email?.toLowerCase().includes(query) ||
        app.id.toLowerCase().includes(query) ||
        app.properties?.[0]?.property_address?.toLowerCase().includes(query)
      );
    }

    // Applicant type filter
    if (applicantTypeFilter !== 'all') {
      filtered = filtered.filter(app => app.applicant_type === applicantTypeFilter);
    }

    // Amount range filter
    filtered = filtered.filter(app => {
      const amount = app.requested_advance_amount || 0;
      return amount >= amountRange[0] && amount <= amountRange[1];
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        const dateA = new Date(a.submitted_at || a.created_at).getTime();
        const dateB = new Date(b.submitted_at || b.created_at).getTime();
        comparison = dateB - dateA;
      } else if (sortBy === 'amount') {
        comparison = (b.requested_advance_amount || 0) - (a.requested_advance_amount || 0);
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    setFilteredApplications(filtered);
  };

  useEffect(() => {
    applyFiltersAndSort(applications);
  }, [searchQuery, sortBy, sortOrder, applicantTypeFilter, amountRange]);

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['ID', 'Name', 'Email', 'Type', 'Amount', 'Status', 'Date'];
    csvRows.push(headers.join(','));

    filteredApplications.forEach(app => {
      const row = [
        app.id.slice(0, 8),
        app.profiles?.full_name || '',
        app.profiles?.email || '',
        app.applicant_type || '',
        app.requested_advance_amount || 0,
        app.status || '',
        new Date(app.submitted_at || app.created_at).toLocaleDateString()
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications-${statusFilter}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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

  const resetFilters = () => {
    setSearchQuery('');
    setApplicantTypeFilter('all');
    setAmountRange([0, 500000]);
    setSortBy('date');
    setSortOrder('desc');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Application Review Queue
            </CardTitle>
            <CardDescription>Review and manage submitted applications</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV} disabled={filteredApplications.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
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

          {/* Search and Filter Controls */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
            <div className="flex gap-3 flex-wrap">
              {/* Search */}
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, ID, or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(val: 'date' | 'amount') => setSortBy(val)}>
                <SelectTrigger className="w-[160px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="amount">Sort by Amount</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>

              {/* Advanced Filters */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {(applicantTypeFilter !== 'all' || amountRange[0] > 0 || amountRange[1] < 500000) && (
                      <Badge className="ml-2 h-5 w-5 rounded-full p-0" variant="secondary">!</Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Applicant Type</Label>
                      <Select value={applicantTypeFilter} onValueChange={setApplicantTypeFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="str_host">STR Host</SelectItem>
                          <SelectItem value="real_estate_agent">Real Estate Agent</SelectItem>
                          <SelectItem value="property_manager">Property Manager</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="broker">Broker</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Amount Range</Label>
                      <div className="pt-2">
                        <Slider
                          min={0}
                          max={500000}
                          step={5000}
                          value={amountRange}
                          onValueChange={(val) => setAmountRange(val as [number, number])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>${amountRange[0].toLocaleString()}</span>
                          <span>${amountRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
                      Reset Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Active Filters Summary */}
            {(searchQuery || applicantTypeFilter !== 'all' || amountRange[0] > 0 || amountRange[1] < 500000) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">Active filters:</span>
                {searchQuery && <Badge variant="secondary">Search: {searchQuery}</Badge>}
                {applicantTypeFilter !== 'all' && <Badge variant="secondary">Type: {applicantTypeFilter.replace(/_/g, ' ')}</Badge>}
                {(amountRange[0] > 0 || amountRange[1] < 500000) && (
                  <Badge variant="secondary">
                    Amount: ${amountRange[0].toLocaleString()} - ${amountRange[1].toLocaleString()}
                  </Badge>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredApplications.length}</span> of {applications.length} applications
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No applications found</p>
              <p className="text-sm">
                {applications.length === 0 
                  ? statusFilter === 'submitted' 
                    ? 'No applications awaiting review at this time'
                    : `No ${statusFilter === 'all' ? '' : statusFilter} applications found`
                  : 'No applications match your current filters'
                }
              </p>
              {applications.length > 0 && (
                <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => (
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
