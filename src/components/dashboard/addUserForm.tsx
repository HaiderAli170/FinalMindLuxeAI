'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  age: z.coerce.number().min(0, 'Age must be a positive number').optional(),
  height: z.coerce.number().min(0, 'Height must be a positive number').optional(),
  weight: z.coerce.number().min(0, 'Weight must be a positive number').optional(),
  isPremium: z.boolean().default(false),
});

interface AddUserFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function AddUserForm({ onSubmit, onCancel }: AddUserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      height: undefined,
      weight: undefined,
      isPremium: false,
    },
  });

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Add New User</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Age" {...field} className="h-9" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Height" {...field} className="h-9" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-16-regular">Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Weight" {...field} className="h-9" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isPremium"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm">Premium Membership</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Enable premium features for this user
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="h-9"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-9">Add User</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 