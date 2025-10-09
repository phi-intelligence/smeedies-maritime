import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Mail, 
  User, 
  Building, 
  Calendar, 
  Eye, 
  Trash2, 
  LogOut, 
  Search,
  Filter,
  CheckCircle,
  Clock,
  TrendingUp,
  Users
} from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface DashboardStats {
  totalMessages: number;
  unreadMessages: number;
  readMessages: number;
}

interface AdminUser {
  id: string;
  username: string;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ totalMessages: 0, unreadMessages: 0, readMessages: 0 });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">("all");
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Load dashboard data
  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/status', {
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.authenticated) {
        setUser(data.user);
      } else {
        setLocation('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setLocation('/admin/login');
    }
  };

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [messagesResponse, statsResponse] = await Promise.all([
        fetch('/api/admin/messages', { credentials: 'include' }),
        fetch('/api/admin/stats', { credentials: 'include' })
      ]);

      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setMessages(messagesData.messages);
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setLocation('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}/read`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, isRead: true } : msg
        ));
        setStats(prev => ({
          ...prev,
          unreadMessages: prev.unreadMessages - 1,
          readMessages: prev.readMessages + 1
        }));
        toast({
          title: "Message Marked as Read",
          description: "The message has been marked as read.",
        });
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark message as read.",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        setStats(prev => ({
          ...prev,
          totalMessages: prev.totalMessages - 1,
          unreadMessages: messages.find(m => m.id === messageId && !m.isRead) 
            ? prev.unreadMessages - 1 
            : prev.unreadMessages
        }));
        toast({
          title: "Message Deleted",
          description: "The message has been deleted successfully.",
        });
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  // Filter and search messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.company && message.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "read" && message.isRead) ||
                         (filterStatus === "unread" && !message.isRead);
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <Badge variant="secondary" className="bg-blue-600 text-white">
                Smeedies Maritime
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.username}</span>
              <Button onClick={handleLogout} variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalMessages}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Unread Messages</CardTitle>
              <Clock className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.unreadMessages}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Read Messages</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.readMessages}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.totalMessages > 0 ? Math.round((stats.readMessages / stats.totalMessages) * 100) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages Section */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Messages</CardTitle>
            <CardDescription className="text-gray-400">
              Manage contact form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                  className={filterStatus === "all" ? "bg-blue-600" : "border-slate-600 text-gray-300"}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "unread" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("unread")}
                  className={filterStatus === "unread" ? "bg-orange-600" : "border-slate-600 text-gray-300"}
                >
                  Unread
                </Button>
                <Button
                  variant={filterStatus === "read" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("read")}
                  className={filterStatus === "read" ? "bg-green-600" : "border-slate-600 text-gray-300"}
                >
                  Read
                </Button>
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-4">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No messages found matching your criteria.
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border ${
                      message.isRead 
                        ? 'bg-slate-700 border-slate-600' 
                        : 'bg-slate-600 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-white">{message.name}</h3>
                          {!message.isRead && (
                            <Badge variant="secondary" className="bg-orange-600 text-white text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-2">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {message.email}
                          </div>
                          {message.company && (
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {message.company}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(message.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMessage(message)}
                              className="border-slate-600 text-gray-300 hover:bg-slate-600"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-white">Message Details</DialogTitle>
                            </DialogHeader>
                            {selectedMessage && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-gray-300">Name</Label>
                                    <p className="text-white">{selectedMessage.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Email</Label>
                                    <p className="text-white">{selectedMessage.email}</p>
                                  </div>
                                </div>
                                
                                {selectedMessage.company && (
                                  <div>
                                    <Label className="text-gray-300">Company</Label>
                                    <p className="text-white">{selectedMessage.company}</p>
                                  </div>
                                )}
                                
                                {selectedMessage.service && (
                                  <div>
                                    <Label className="text-gray-300">Service</Label>
                                    <p className="text-white">{selectedMessage.service}</p>
                                  </div>
                                )}
                                
                                <div>
                                  <Label className="text-gray-300">Message</Label>
                                  <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                                
                                <div>
                                  <Label className="text-gray-300">Date</Label>
                                  <p className="text-white">
                                    {new Date(selectedMessage.createdAt).toLocaleString()}
                                  </p>
                                </div>
                                
                                {!selectedMessage.isRead && (
                                  <Button
                                    onClick={() => markAsRead(selectedMessage.id)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Mark as Read
                                  </Button>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-slate-800 border-slate-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Message</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-300">
                                Are you sure you want to delete this message? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-slate-600 text-gray-300">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMessage(message.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
