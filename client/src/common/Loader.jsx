import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import './Loader.css'
import { NavLink } from 'react-router-dom';

const Loader = () => {


  return (
    <>
      <div className="flex items-center justify-center" style={{ height: "85vh" }}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Our Platform!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            It looks like this is your first time logging in.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Let's get you started with a quick login and then you can start uploading your documents.
          </p>
          <NavLink to="/login" className="block">
          <Button className="w-full">
            Login
          </Button>
          </NavLink>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default Loader;
