import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Loader2, Search, ArrowUpDown, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UserReviewCard from './UserReviewCard';

const UserManagementQueue = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'applications'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch users with their applications and advances
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch applications for each user
      const { data: applicationsData, error: appsError } = await supabase
        .from('applications')
        .select('*')
        .neq('status', 'draft');

      if (appsError) throw appsError;

      // Fetch advances for each user
      const { data: advancesData, error: advError } = await supabase
        .from('advances')
        .select('*');

      if (advError) throw advError;

      // Combine data
      const usersWithData = (profilesData || []).map(profile => ({
        ...profile,
        applications: (applicationsData || []).filter(app => app.user_id === profile.id),
        advances: (advancesData || []).filter(adv => adv.user_id === profile.id),
      }));

      setUsers(usersWithData);
      applyFiltersAndSort(usersWithData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = (usersData: any[]) => {
    let filtered = [...usersData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.full_name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.phone_number?.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = (a.full_name || '').localeCompare(b.full_name || '');
      } else if (sortBy === 'date') {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        comparison = dateB - dateA;
      } else if (sortBy === 'applications') {
        comparison = (b.applications?.length || 0) - (a.applications?.length || 0);
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    applyFiltersAndSort(users);
  }, [searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['User ID', 'Name', 'Email', 'Phone', 'Applications', 'Total Funded', 'Joined Date'];
    csvRows.push(headers.join(','));

    filteredUsers.forEach(user => {
      const totalFunded = user.advances?.reduce((sum: number, adv: any) => sum + (adv.disbursed_amount || 0), 0) || 0;
      const row = [
        user.id.slice(0, 8),
        user.full_name || '',
        user.email || '',
        user.phone_number || '',
        user.applications?.length || 0,
        totalFunded,
        new Date(user.created_at).toLocaleDateString()
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>View and manage registered users</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV} disabled={filteredUsers.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Sort Controls */}
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg border mb-6">
          <div className="flex gap-3 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, phone, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(val: 'name' | 'date' | 'applications') => setSortBy(val)}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Join Date</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="applications">Sort by Applications</SelectItem>
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
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredUsers.length}</span> of {users.length} users
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No users found</p>
            <p className="text-sm">
              {users.length === 0 
                ? 'No registered users yet'
                : 'No users match your current search'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <UserReviewCard
                key={user.id}
                user={user}
                applications={user.applications}
                advances={user.advances}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagementQueue;