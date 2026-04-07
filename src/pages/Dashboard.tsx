import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, LogOut, FileText, Plus, DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle, ArrowUpRight, Edit2, Trash2, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AirbnbConnectionStatus from '@/components/dashboard/AirbnbConnectionStatus';
import NotificationBell from '@/components/dashboard/NotificationBell';
import ApplicationDetailsDialog from '@/components/dashboard/ApplicationDetailsDialog';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [advances, setAdvances] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  // Check if user has completed onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from('profiles')
          .select('industry_type')
          .eq('id', user.id)
          .maybeSingle();

        if (data && !data.industry_type) {
          navigate('/onboarding', { replace: true });
          return;
        }
      } catch (err) {
        console.error('Onboarding check error:', err);
      } finally {
        setCheckingOnboarding(false);
      }
    };
    if (user && !isAdmin) {
      checkOnboarding();
    } else {
      setCheckingOnboarding(false);
    }
  }, [user, isAdmin, navigate]);

  // Fetch user's applications and advances
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const { data: appsData } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        const { data: advancesData } = await supabase
          .from('advances')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        setApplications(appsData || []);
        setAdvances(advancesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingData(false);
      }
    };
    
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading || checkingOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  // Redirect admins to admin dashboard
  if (isAdmin) {
    navigate('/admin');
    return null;
  }

  // Calculate stats
  const totalAdvanced = advances.reduce((sum, adv) => sum + parseFloat(adv.approved_amount || 0), 0);
  const totalRepaid = advances.reduce((sum, adv) => sum + parseFloat(adv.amount_repaid || 0), 0);
  const activeAdvances = advances.filter(adv => adv.status === 'active').length;
  const pendingApplications = applications.filter(app => app.status === 'submitted' || app.status === 'under_review').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'submitted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'under_review': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleEditDraft = (applicationId: string) => {
    navigate(`/application/new?draft=${applicationId}`);
  };

  const handleDeleteDraft = async () => {
    if (!applicationToDelete) return;
    
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationToDelete);
      
      if (error) throw error;
      
      setApplications(prev => prev.filter(app => app.id !== applicationToDelete));
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  const openDeleteDialog = (applicationId: string) => {
    setApplicationToDelete(applicationId);
    setDeleteDialogOpen(true);
  };

  const handleViewApplication = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
      {/* Header */}
      <header className="backdrop-blur-sm bg-background/80 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              REAL ESTATE ADVANCE PARTNERS
            </h1>
            <p className="text-sm text-muted-foreground">Property Owner Portal</p>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <Button variant="outline" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">
            Manage your cash advance applications and track your financial progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Advanced
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalAdvanced.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Lifetime funding received
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Repaid
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRepaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {advances.length > 0 ? `${((totalRepaid / totalAdvanced) * 100).toFixed(0)}% of total` : 'No repayments yet'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Advances
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeAdvances}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently active
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Applications
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingApplications}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Under review
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate('/application/new')}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                <Plus className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">New Application</h3>
                <p className="text-sm text-muted-foreground">Apply for a new cash advance</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="advances">Active Advances</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : applications.length === 0 && advances.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No activity yet</p>
                      <p className="text-sm mt-1">Start by creating a new application</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[...applications.slice(0, 3)].map((app) => (
                        <div 
                          key={app.id} 
                          className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                            app.status !== 'draft' ? 'cursor-pointer hover:bg-muted/50 hover:border-primary/30' : 'hover:bg-muted/50'
                          }`}
                          onClick={() => app.status !== 'draft' && handleViewApplication(app.id)}
                        >
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {app.applicant_type ? app.applicant_type.replace(/_/g, ' ').toUpperCase() : 'Application'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(app.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline" className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Airbnb Connection */}
              <AirbnbConnectionStatus />
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Track the status of your cash advance applications</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No applications yet</p>
                    <p className="text-sm mt-1 mb-4">Click "New Application" to get started</p>
                    <Button onClick={() => navigate('/application/new')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Application
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.map((app) => {
                      const draftName = app.form_data?.draftName;
                      const displayName = app.status === 'draft' && draftName 
                        ? draftName 
                        : (app.applicant_type ? app.applicant_type.replace(/_/g, ' ').toUpperCase() : 'Application');
                      
                      return (
                        <div 
                          key={app.id} 
                          className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                            app.status !== 'draft' ? 'cursor-pointer hover:bg-muted/50 hover:border-primary/30' : 'hover:bg-muted/50'
                          }`}
                          onClick={() => app.status !== 'draft' && handleViewApplication(app.id)}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">
                                {displayName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {app.status === 'draft' ? 'Saved' : 'Applied'} {new Date(app.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            {app.preferred_advance_amount && (
                              <div className="text-right hidden sm:block">
                                <p className="text-sm text-muted-foreground">Amount</p>
                                <p className="font-semibold">${parseFloat(app.preferred_advance_amount).toLocaleString()}</p>
                              </div>
                            )}
                            <Badge variant="outline" className={getStatusColor(app.status)}>
                              {app.status}
                            </Badge>
                            {app.status === 'draft' ? (
                              <div className="flex gap-2">
                                <Button 
                                  size="icon" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditDraft(app.id);
                                  }}
                                  className="h-9 w-9"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="icon" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDeleteDialog(app.id);
                                  }}
                                  className="h-9 w-9 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                size="icon" 
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewApplication(app.id);
                                }}
                                className="h-9 w-9"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advances" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Advances</CardTitle>
                <CardDescription>Monitor your repayment progress</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : advances.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No active advances</p>
                    <p className="text-sm mt-1">Your approved advances will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {advances.map((advance) => {
                      const progress = (parseFloat(advance.amount_repaid) / parseFloat(advance.total_repayment_amount)) * 100;
                      return (
                        <div key={advance.id} className="p-4 border rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">Advance #{advance.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">
                                Approved {new Date(advance.approved_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              {advance.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Approved</p>
                              <p className="font-semibold">${parseFloat(advance.approved_amount).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Repaid</p>
                              <p className="font-semibold">${parseFloat(advance.amount_repaid).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Remaining</p>
                              <p className="font-semibold">
                                ${(parseFloat(advance.total_repayment_amount) - parseFloat(advance.amount_repaid)).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Repayment Progress</span>
                              <span className="font-medium">{progress.toFixed(0)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Draft</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this draft? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDraft} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ApplicationDetailsDialog 
        applicationId={selectedApplicationId}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </div>
  );
};

export default Dashboard;
