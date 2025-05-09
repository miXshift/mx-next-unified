'use client';

import * as React from 'react';
import { Button } from './components/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/card';
import { Badge } from './components/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/avatar';
import { Separator } from './components/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './components/tooltip';
import { Checkbox } from './components/checkbox';
import { Input } from './components/input';
import { Label } from './components/label';

export interface TestComponentProps {
  text?: string;
}

export function TestComponent({ text = 'Click me' }: TestComponentProps) {
  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>UI Library Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/mixshift.png" alt="@mixshift" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <Badge>New</Badge>
          </div>
          
          <Separator />
          
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">{text}</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Separator />
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TestComponent;
