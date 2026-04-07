import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Loader2, LogOut, FileText, Plus, DollarSign, TrendingUp, Clock,
  CheckCircle2, AlertCircle, ArrowUpRight, Edit2, Trash2, Eye,
  Unlock, CalendarClock, Wallet, Lock, Sparkles, Building2, Receipt, Banknote
} from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import NotificationBell from '@/components/dashboard/NotificationBell';
import AddReceivableDialog from '@/components/dashboard/AddReceivableDialog';
import UnlockEarningsDialog from '@/components/dashboard/UnlockEarningsDialog';
import ApplicationDetailsDialog from '@/components/dashboard/ApplicationDetailsDialog';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

// Industry-specific labels
const industryLabels: Record<string, { receivablesTitle: string; dateLabel: string }> = {
  STR_HOST: { receivablesTitle: 'Upcoming Bookings', dateLabel: 'Payout Schedule' },
  PROPERTY_MANAGER: { receivablesTitle: 'Rent Roll', dateLabel: 'Owner Distributions' },
  AGENT: { receivablesTitle: 'Pending Commissions', dateLabel: 'Closing Dates' },
  BROKER: { receivablesTitle: 'Pending Commissions', dateLabel: 'Closing Dates' },
  CONTRACTOR: { receivablesTitle: 'Approved Invoices', dateLabel: 'Draw Schedule' },
  DEVELOPER: { receivablesTitle: 'Project Receivables', dateLabel: 'Milestone Dates' },
  REAL_ESTATE_OPERATOR: { receivablesTitle: 'Receivables', dateLabel: 'Expected Payout' },
};

const receivableStatusConfig: Record<string, { class: string; label: string }> = {
  PENDING: { class: 'bg-amber-500/10 text-amber-600 border-amber-500/20', label: 'Pending' },
  ELIGIBLE: { class: 'bg-primary/10 text-primary border-primary/20', label: 'Eligible' },
  ADVANCED: { class: 'bg-secondary/10 text-secondary border-secondary/20', label: 'Advanced' },
  SETTLED: { class: 'bg-muted text-muted-foreground border-muted', label: 'Settled' },
};

const Dashboard = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [advances, setAdvances] = useState<any[]>([]);
  const [receivables, setReceivables] = useState<any[]>([]);
  const [industryType, setIndustryType] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [addReceivableOpen, setAddReceivableOpen] = useState(false);

  // Check onboarding + fetch industry type
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
        if (data?.industry_type) {
          setIndustryType(data.industry_type as string);
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

  const fetchData = async () => {
    if (!user) return;
    try {
      const [appsRes, advRes, recRes] = await Promise.all([
        supabase.from('applications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('advances').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('receivables').select('*').eq('user_id', user.id).order('expected_payout_date', { ascending: true }),
      ]);
      setApplications(appsRes.data || []);
      setAdvances(advRes.data || []);
      setReceivables(recRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  // Fetch data
  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading || checkingOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (isAdmin) {
    navigate('/admin');
    return null;
  }

  // Metrics
  const eligibleReceivables = receivables.filter(r => r.status === 'ELIGIBLE');
  const availableToUnlock = eligibleReceivables.reduce((s, r) => s + parseFloat(r.amount || 0), 0);
  const activeAdvanceTotal = advances
    .filter(a => a.status === 'active' || a.advance_status === 'ACTIVE')
    .reduce((s, a) => s + parseFloat(a.approved_amount || a.net_amount || 0), 0);
  const totalUnlocked = advances.reduce((s, a) => s + parseFloat(a.approved_amount || a.net_amount || 0), 0);

  // Next repayment: find the active advance with closest expected_completion_date
  const activeAdvancesWithDate = advances
    .filter(a => (a.status === 'active' || a.advance_status === 'ACTIVE') && a.expected_completion_date)
    .sort((a, b) => new Date(a.expected_completion_date).getTime() - new Date(b.expected_completion_date).getTime());
  const nextRepayment = activeAdvancesWithDate[0];
  const nextRepaymentAmount = nextRepayment
    ? parseFloat(nextRepayment.total_repayment_amount || 0) - parseFloat(nextRepayment.amount_repaid || 0)
    : 0;

  const labels = industryLabels[industryType || ''] || industryLabels.REAL_ESTATE_OPERATOR;

  const getAppStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'funded': return 'bg-primary/10 text-primary border-primary/20';
      case 'submitted': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'under_review': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleEditDraft = (id: string) => navigate(`/application/new?draft=${id}`);

  const handleDeleteDraft = async () => {
    if (!applicationToDelete) return;
    try {
      await supabase.from('applications').delete().eq('id', applicationToDelete);
      setApplications(prev => prev.filter(a => a.id !== applicationToDelete));
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
    } catch (err) { console.error('Delete error:', err); }
  };

  const handleViewApplication = (id: string) => {
    setSelectedApplicationId(id);
    setDetailsDialogOpen(true);
  };

  const formatCurrency = (val: number) =>
    val >= 1000 ? `$${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k` : `$${val.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">REAP</h1>
            <p className="text-xs text-secondary-foreground/60">Real Estate Advance Partners</p>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <Button variant="ghost" size="sm" onClick={signOut} className="text-secondary-foreground/80 hover:text-secondary-foreground hover:bg-secondary-foreground/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 max-w-6xl">
        {/* Empty state checklist */}
        {!loadingData && receivables.length === 0 && advances.length === 0 ? (
          <div className="space-y-6">
            <div className="text-center pt-4 pb-2">
              <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-foreground">Welcome to REAP — let's get you set up</h2>
              <p className="text-sm text-muted-foreground mt-1">Complete these steps to unlock your first advance.</p>
            </div>

            <Card className="border max-w-lg mx-auto">
              <CardContent className="p-6 space-y-1">
                {/* Step 1 */}
                <div className={cn(
                  'flex items-center gap-4 p-4 rounded-lg transition-colors',
                  industryType ? 'bg-primary/5' : 'bg-muted/50'
                )}>
                  <div className={cn(
                    'h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0',
                    industryType ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'
                  )}>
                    {industryType ? <CheckCircle2 className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('font-medium text-sm', industryType && 'text-muted-foreground line-through')}>
                      Select your industry
                    </p>
                    <p className="text-xs text-muted-foreground">Tell us what you do so we can tailor your experience</p>
                  </div>
                  {!industryType && (
                    <Button size="sm" onClick={() => navigate('/onboarding')}>
                      Get Started
                    </Button>
                  )}
                </div>

                {/* Step 2 */}
                <div className={cn(
                  'flex items-center gap-4 p-4 rounded-lg transition-colors',
                  !industryType ? 'opacity-50' : receivables.length > 0 ? 'bg-primary/5' : 'bg-muted/50'
                )}>
                  <div className={cn(
                    'h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0',
                    receivables.length > 0 ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'
                  )}>
                    {!industryType ? <Lock className="h-5 w-5" /> : receivables.length > 0 ? <CheckCircle2 className="h-5 w-5" /> : <Receipt className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">Add your first receivable</p>
                    <p className="text-xs text-muted-foreground">Log your upcoming income so we can evaluate eligibility</p>
                  </div>
                  {industryType && receivables.length === 0 && (
                    <AddReceivableDialog userId={user.id} industryType={industryType} onSuccess={fetchData} />
                  )}
                </div>

                {/* Step 3 */}
                <div className={cn(
                  'flex items-center gap-4 p-4 rounded-lg transition-colors',
                  receivables.length === 0 ? 'opacity-50' : advances.length > 0 ? 'bg-primary/5' : 'bg-muted/50'
                )}>
                  <div className={cn(
                    'h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0',
                    advances.length > 0 ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'
                  )}>
                    {receivables.length === 0 ? <Lock className="h-5 w-5" /> : advances.length > 0 ? <CheckCircle2 className="h-5 w-5" /> : <Banknote className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">Request your first advance</p>
                    <p className="text-xs text-muted-foreground">Unlock your verified income and get funded</p>
                  </div>
                  {receivables.length > 0 && advances.length === 0 && (
                    <UnlockEarningsDialog
                      userId={user.id}
                      eligibleReceivables={eligibleReceivables}
                      onSuccess={fetchData}
                      onAddReceivable={() => setAddReceivableOpen(true)}
                      trigger={<Button size="sm" variant="outline">Unlock</Button>}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
        <>
        {/* Welcome */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              You have income on the way. Here's your snapshot.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UnlockEarningsDialog
              userId={user.id}
              eligibleReceivables={eligibleReceivables}
              onSuccess={fetchData}
              onAddReceivable={() => setAddReceivableOpen(true)}
            />
            <AddReceivableDialog userId={user.id} industryType={industryType} onSuccess={fetchData} />
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Available to Unlock */}
          <Card className="border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Unlock className="h-4.5 w-4.5 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Available to Unlock</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(availableToUnlock)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {eligibleReceivables.length} eligible {eligibleReceivables.length === 1 ? 'receivable' : 'receivables'}
              </p>
            </CardContent>
          </Card>

          {/* Active Advances */}
          <Card className="border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="h-4.5 w-4.5 text-secondary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Active Advances</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(activeAdvanceTotal)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {advances.filter(a => a.status === 'active' || a.advance_status === 'ACTIVE').length} active
              </p>
            </CardContent>
          </Card>

          {/* Upcoming Repayments */}
          <Card className="border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <CalendarClock className="h-4.5 w-4.5 text-amber-600" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Upcoming Repayment</p>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {nextRepayment ? formatCurrency(nextRepaymentAmount) : '—'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {nextRepayment
                  ? new Date(nextRepayment.expected_completion_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : 'No upcoming repayments'}
              </p>
            </CardContent>
          </Card>

          {/* Total Unlocked */}
          <Card className="border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-4.5 w-4.5 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Unlocked</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalUnlocked)}</p>
              <p className="text-xs text-muted-foreground mt-1">Lifetime total advanced</p>
            </CardContent>
          </Card>
        </div>

        {/* Receivables List */}
        <Card className="border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{labels.receivablesTitle}</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Track your income and {labels.dateLabel.toLowerCase()}
                </p>
              </div>
              <AddReceivableDialog userId={user.id} industryType={industryType} onSuccess={fetchData} />
            </div>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : receivables.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <DollarSign className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No receivables yet</p>
                <p className="text-sm mt-1">Your {labels.receivablesTitle.toLowerCase()} will appear here once added.</p>
              </div>
            ) : (
              <div className="divide-y">
                {receivables.map((rec) => {
                  const statusCfg = receivableStatusConfig[rec.status] || receivableStatusConfig.PENDING;
                  return (
                    <div key={rec.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{rec.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {labels.dateLabel}: {rec.expected_payout_date
                            ? new Date(rec.expected_payout_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'TBD'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <p className="font-semibold text-sm text-foreground">
                          ${parseFloat(rec.amount || 0).toLocaleString()}
                        </p>
                        <Badge variant="outline" className={cn('text-xs', statusCfg.class)}>
                          {statusCfg.label}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Applications & Advances */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Applications */}
          <Card className="border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Applications</CardTitle>
              <p className="text-sm text-muted-foreground">Your advance applications</p>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No applications yet</p>
                  <p className="text-sm mt-1">Start by creating a new application</p>
                </div>
              ) : (
                <div className="divide-y">
                  {applications.map((app) => {
                    const displayName = app.status === 'draft' && app.form_data?.draftName
                      ? app.form_data.draftName
                      : (app.applicant_type ? app.applicant_type.replace(/_/g, ' ') : 'Application');

                    return (
                      <div
                        key={app.id}
                        className={cn(
                          'flex items-center justify-between py-3 first:pt-0 last:pb-0',
                          app.status !== 'draft' && 'cursor-pointer hover:bg-muted/30 -mx-3 px-3 rounded-lg transition-colors'
                        )}
                        onClick={() => app.status !== 'draft' && handleViewApplication(app.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate capitalize">{displayName}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            {app.preferred_advance_amount && ` · $${parseFloat(app.preferred_advance_amount).toLocaleString()}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="outline" className={cn('text-xs capitalize', getAppStatusColor(app.status))}>
                            {app.status.replace('_', ' ')}
                          </Badge>
                          {app.status === 'draft' ? (
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleEditDraft(app.id); }}>
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={(e) => { e.stopPropagation(); setApplicationToDelete(app.id); setDeleteDialogOpen(true); }}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleViewApplication(app.id); }}>
                              <Eye className="h-3.5 w-3.5" />
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

          {/* Active Advances */}
          <Card className="border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Advances</CardTitle>
              <p className="text-sm text-muted-foreground">Repayment progress</p>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : advances.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No active advances</p>
                  <p className="text-sm mt-1">Approved advances will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {advances.map((adv) => {
                    const total = parseFloat(adv.total_repayment_amount || 0);
                    const repaid = parseFloat(adv.amount_repaid || 0);
                    const progress = total > 0 ? (repaid / total) * 100 : 0;

                    return (
                      <div key={adv.id} className="p-3 border rounded-lg space-y-2.5">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">Advance #{adv.id.slice(0, 8)}</p>
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 capitalize">
                            {adv.advance_status || adv.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">Advanced</p>
                            <p className="font-semibold">${parseFloat(adv.approved_amount || adv.net_amount || 0).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Repaid</p>
                            <p className="font-semibold">${repaid.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Remaining</p>
                            <p className="font-semibold">${(total - repaid).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progress.toFixed(0)}%</span>
                          </div>
                          <Progress value={progress} className="h-1.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        </>
        )}
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
