import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut, FileText, Plus } from 'lucide-react';
import AirbnbConnectionStatus from '@/components/dashboard/AirbnbConnectionStatus';
import QuickAdvanceCalculator from '@/components/dashboard/QuickAdvanceCalculator';

const Dashboard = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
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

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">REAL ESTATE ADVANCE PARTNERS</h1>
            <p className="text-sm text-muted-foreground">Property Owner Portal</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">
            Manage your cash advance applications and track your property portfolio
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Button 
            size="lg" 
            className="h-32 text-lg flex flex-col gap-3"
            onClick={() => navigate('/application/new')}
          >
            <Plus className="h-8 w-8" />
            <span>New Application</span>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="h-32 text-lg flex flex-col gap-3"
            onClick={() => navigate('/applications')}
          >
            <FileText className="h-8 w-8" />
            <span>My Applications</span>
          </Button>
        </div>

        {/* Applications List */}
        <div className="bg-background rounded-lg border p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No applications yet</p>
            <p className="text-sm">Click "New Application" to get started</p>
          </div>
        </div>

        {/* Airbnb Connection Status */}
        <div className="grid lg:grid-cols-2 gap-6">
          <AirbnbConnectionStatus />
          <QuickAdvanceCalculator />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
