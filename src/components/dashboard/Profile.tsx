import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Users, FolderOpen, UserPlus } from 'lucide-react';

type HeroHeaderProps = {
    user?: {
        name: string;
        email: string;
        image?: string;
        role?: string;
    } | null;
};

const Profile = ({ user }: HeroHeaderProps) => {
    return (
        <div className="profile-wrapper">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&family=Work+Sans:wght@400;500;600&display=swap');
                
                .profile-wrapper {
                    min-height: 100vh;
                    background: linear-gradient(to bottom right, #fafafa 0%, #e5e7eb 50%, #f3f4f6 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    position: relative;
                }
                
                .profile-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 400px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    opacity: 0.05;
                    pointer-events: none;
                }
                
                .profile-container {
                    width: 100%;
                    max-width: 900px;
                    position: relative;
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .main-card {
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02);
                    background: #ffffff;
                    overflow: hidden;
                }
                
                .profile-header-section {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 3rem 2rem 2rem;
                    position: relative;
                    overflow: hidden;
                }
                
                .profile-header-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
                    border-radius: 50%;
                }
                
                .profile-content-section {
                    padding: 2rem;
                }
                
                .profile-header-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 2rem;
                    position: relative;
                    z-index: 1;
                }
                
                .avatar-wrapper {
                    position: relative;
                    animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
                }
                
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .avatar-large {
                    width: 120px;
                    height: 120px;
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                
                .avatar-large:hover {
                    transform: scale(1.05);
                }
                
                .avatar-fallback-large {
                    font-family: 'Crimson Pro', serif;
                    font-size: 3rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                }
                
                .user-info {
                    flex: 1;
                    min-width: 0;
                    animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
                }
                
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .user-name {
                    font-family: 'Crimson Pro', serif;
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                    letter-spacing: -0.01em;
                }
                
                .user-email {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255, 255, 255, 0.9);
                    font-family: 'Work Sans', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 400;
                    margin-top: 0.75rem;
                    transition: color 0.2s ease;
                }
                
                .user-email:hover {
                    color: #ffffff;
                }
                
                .role-badge {
                    background: rgba(255, 255, 255, 0.25);
                    color: #ffffff;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    font-family: 'Work Sans', sans-serif;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-size: 0.75rem;
                    padding: 0.4rem 1rem;
                    backdrop-filter: blur(10px);
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                
                .stat-card {
                    border: 1px solid #e5e7eb;
                    background: #fafafa;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    animation: fadeIn 0.6s ease-out backwards;
                }
                
                .stat-card:nth-child(1) { animation-delay: 0.4s; }
                .stat-card:nth-child(2) { animation-delay: 0.5s; }
                .stat-card:nth-child(3) { animation-delay: 0.6s; }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .stat-card:hover {
                    background: #ffffff;
                    border-color: #667eea;
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.15);
                }
                
                .stat-content {
                    padding: 1.5rem;
                }
                
                .stat-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }
                
                .stat-label {
                    font-family: 'Work Sans', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .stat-icon {
                    width: 20px;
                    height: 20px;
                    color: #667eea;
                    opacity: 0.6;
                }
                
                .stat-value {
                    font-family: 'Crimson Pro', serif;
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: #111827;
                    line-height: 1;
                }
                
                .empty-state-container {
                    text-align: center;
                    padding: 5rem 2rem;
                }
                
                .empty-icon-wrapper {
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .empty-icon {
                    width: 40px;
                    height: 40px;
                    color: #9ca3af;
                }
                
                .empty-title {
                    font-family: 'Crimson Pro', serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #374151;
                    margin-bottom: 0.5rem;
                }
                
                .empty-description {
                    font-family: 'Work Sans', sans-serif;
                    font-size: 1rem;
                    color: #6b7280;
                }
                
                @media (max-width: 768px) {
                    .profile-header-content {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                    
                    .user-name {
                        font-size: 2rem;
                    }
                    
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <div className="profile-container">
                {user ? (
                    <Card className="main-card">
                        <div className="profile-header-section">
                            <div className="profile-header-content">
                                <div className="avatar-wrapper">
                                    <Avatar className="avatar-large">
                                        <AvatarImage src={user.image} alt={user.name} />
                                        <AvatarFallback className="avatar-fallback-large">
                                            {user.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                
                                <div className="user-info">
                                    <h1 className="user-name">{user.name}</h1>
                                    {user.role && (
                                        <Badge className="role-badge">{user.role}</Badge>
                                    )}
                                    <div className="user-email">
                                        <Mail size={16} />
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <CardContent className="profile-content-section">
                            <div className="stats-grid">
                               
                                
                                
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="main-card">
                        <CardContent className="empty-state-container">
                            <div className="empty-icon-wrapper">
                                <Users className="empty-icon" />
                            </div>
                            <h2 className="empty-title">No Profile Data</h2>
                            <p className="empty-description">User information is not available</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Profile;