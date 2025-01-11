import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const announcements = [
    {
        title: "Email verification for Identifying Valid and Avoiding Fake Email Signup",
        date: "12-Jan-2025",
        description: "Email verification is a critical process in web applications to ensure that users provide legitimate and valid email addresses during signup. This prevents spam, fake accounts, and enhances the integrity of user databases."
    },
    {
        title: "Search Functionality for Documents",
        date: "13-Jan-2025",
        description: "Document search functionality allows users to quickly locate files or content within a system by entering keywords or phrases."
    },
    {
        title: "Upload of PDF Document",
        date: "15-Jan-2025",
        description: "Feature that allows users to upload PDF files to a web application or platform. It enables users to securely submit files for storage, processing, or sharing."
    },
];

const Announcement = () => {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-semibold mb-8">Upcoming Announcements</h1>
            <div className="space-y-6">
                {announcements && announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{announcement.title}</CardTitle>
                                <p className="text-sm text-gray-500">Date: {announcement.date}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-700">{announcement.description}</p>
                            </CardContent>
                            {index !== announcements.length - 1 && <Separator />}
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No announcements at the moment. Stay tuned!</p>
                )}
            </div>
        </div>
    );
};

export default Announcement;
