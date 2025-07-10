import React from 'react';
import { Heart, DollarSign, Calendar, Clock } from 'lucide-react';

const UserDetails = ({ user }:any) => {
  const getMentalHealthStatus = (score:any) => {
    if (score >= 85) return { status: 'Excellent', color: 'text-green-500' };
    if (score >= 70) return { status: 'Good', color: 'text-blue-500' };
    if (score >= 50) return { status: 'Fair', color: 'text-yellow-500' };
    return { status: 'Needs Attention', color: 'text-red-500' };
  };

  const { status, color } = getMentalHealthStatus(user.mentalHealthScore);

  return (
    <div className="space-y-6 py-4">
      {/* User Profile Section */}
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">
          {user.name.split(' ').map((n:any) => n[0]).join('')}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Membership details */}
      <div className="grid gap-4">
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Joined</span>
          </div>
          <span className="text-sm">{user.joinDate}</span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Last Active</span>
          </div>
          <span className="text-sm">{user.lastActive}</span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Subscription</span>
          </div>
          {user.isPremium ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Premium
            </span>
          ) : (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              Free
            </span>
          )}
        </div>
      </div>

      {/* Mental Health Score */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" />
          Mental Health Assessment
        </h4>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${color}`}>{status}</span>
            <span className="text-sm font-medium">{user.mentalHealthScore}/100</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                user.mentalHealthScore >= 85 ? 'bg-green-500' :
                user.mentalHealthScore >= 70 ? 'bg-blue-500' :
                user.mentalHealthScore >= 50 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${user.mentalHealthScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Additional Information (placeholder) */}
      <div className="rounded-md border p-4 bg-gray-50">
        <h4 className="text-sm font-medium mb-2">Session History</h4>
        <p className="text-sm text-gray-500">
          {user.notes || 'No session notes available for this user.'}
        </p>
      </div>
      
      {/* Activity Section (placeholder) */}
      <div>
        <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            Completed meditation session (25 min)
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            Watched relaxation video
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            Completed wellness assessment
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;