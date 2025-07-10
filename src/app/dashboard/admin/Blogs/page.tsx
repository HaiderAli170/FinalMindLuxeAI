"use client";

import { useState, useEffect } from "react";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getMentalIllnesses,
  createMentalIllness,
  updateMentalIllness,
  deleteMentalIllness,
} from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminPanel() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [mentalIllnesses, setMentalIllnesses] = useState<any[]>([]);
  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    author: "",
    publishedDate: "",
    readTime: "",
    description: "",
    content: "",
    imageUrl: "",
    category: "",
    blogUrl: "",
  });
  const [illnessForm, setIllnessForm] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    link: "",
  });
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [isIllnessDialogOpen, setIsIllnessDialogOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingIllnessId, setEditingIllnessId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const blogsData = await getBlogs();
      const illnessesData = await getMentalIllnesses();
      setBlogs(blogsData);
      setMentalIllnesses(illnessesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { id, ...blogData } = blogForm;
      if (editingBlogId) {
        await updateBlog(editingBlogId, blogData);
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(blogData);
        toast.success("Blog created successfully!");
      }
      resetBlogForm();
      fetchData();
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to submit blog.");
    }
  };

  const handleIllnessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { id, ...illnessData } = illnessForm;
      if (editingIllnessId) {
        await updateMentalIllness(editingIllnessId, illnessData);
        toast.success("Mental illness updated successfully!");
      } else {
        await createMentalIllness(illnessData);
        toast.success("Mental illness created successfully!");
      }
      resetIllnessForm();
      fetchData();
    } catch (error) {
      console.error("Error submitting mental illness:", error);
      toast.error("Failed to submit mental illness.");
    }
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlogId(blog.id);
    setBlogForm(blog);
    setIsBlogDialogOpen(true);
  };

  const handleEditIllness = (illness: any) => {
    setEditingIllnessId(illness.id);
    setIllnessForm(illness);
    setIsIllnessDialogOpen(true);
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id);
      fetchData();
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  const handleDeleteIllness = async (id: string) => {
    try {
      await deleteMentalIllness(id);
      fetchData();
      toast.success("Mental illness deleted successfully!");
    } catch (error) {
      console.error("Error deleting mental illness:", error);
      toast.error("Failed to delete mental illness.");
    }
  };

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogForm({
      id: "", title: "", author: "", publishedDate: "", readTime: "",
      description: "", content: "", imageUrl: "", category: "", blogUrl: "",
    });
    setIsBlogDialogOpen(false);
  };

  const resetIllnessForm = () => {
    setEditingIllnessId(null);
    setIllnessForm({ id: "", title: "", description: "", image: "", link: "" });
    setIsIllnessDialogOpen(false);
  };

  const blogDialog = (
    <Dialog open={isBlogDialogOpen} onOpenChange={(open) => !open && resetBlogForm()}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsBlogDialogOpen(true)}>Create New Blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{editingBlogId ? "Edit Blog" : "Create Blog"}</DialogTitle>
          <DialogDescription>
            {editingBlogId ? "Make changes to your existing blog here." : "Add a new blog to your collection."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBlogSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">Author</Label>
              <Input id="author" value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
              <Input id="imageUrl" value={blogForm.imageUrl} onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="blogUrl" className="text-right">Blog URL</Label>
              <Input id="blogUrl" value={blogForm.blogUrl} onChange={(e) => setBlogForm({ ...blogForm, blogUrl: e.target.value })} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">Description</Label>
              <Textarea id="description" value={blogForm.description} onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetBlogForm}>Cancel</Button>
            <Button type="submit">{editingBlogId ? "Save Changes" : "Create Blog"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  const illnessDialog = (
    <Dialog open={isIllnessDialogOpen} onOpenChange={(open) => !open && resetIllnessForm()}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsIllnessDialogOpen(true)}>Create New Condition</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{editingIllnessId ? "Edit Mental Health Condition" : "Create Mental Health Condition"}</DialogTitle>
           <DialogDescription>
            {editingIllnessId ? "Make changes to your existing mental health condition here." : "Add a new mental health condition to your collection."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleIllnessSubmit}>
           <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="illness-title" className="text-right">Title</Label>
              <Input id="illness-title" value={illnessForm.title} onChange={(e) => setIllnessForm({ ...illnessForm, title: e.target.value })} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="illness-image" className="text-right">Image URL</Label>
              <Input id="illness-image" value={illnessForm.image} onChange={(e) => setIllnessForm({ ...illnessForm, image: e.target.value })} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="illness-link" className="text-right">Link</Label>
              <Input id="illness-link" value={illnessForm.link} onChange={(e) => setIllnessForm({ ...illnessForm, link: e.target.value })} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
               <Label htmlFor="illness-description" className="text-right pt-2">Description</Label>
              <Textarea id="illness-description" value={illnessForm.description} onChange={(e) => setIllnessForm({ ...illnessForm, description: e.target.value })} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetIllnessForm}>Cancel</Button>
            <Button type="submit">{editingIllnessId ? "Save Changes" : "Create Condition"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Content Management</h1>
      <Tabs defaultValue="blogs">
        <TabsList>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="illnesses">Mental Health Conditions</TabsTrigger>
        </TabsList>
        <TabsContent value="blogs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Blogs</CardTitle>
              {blogDialog}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditBlog(blog)}>Edit</Button>
                          <Button variant="dangerOutline" size="sm" onClick={() => handleDeleteBlog(blog.id)}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="illnesses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Mental Health Conditions</CardTitle>
              {illnessDialog}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mentalIllnesses.map((illness) => (
                    <TableRow key={illness.id}>
                      <TableCell>{illness.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{illness.description}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditIllness(illness)}>Edit</Button>
                          <Button variant="dangerOutline" size="sm" onClick={() => handleDeleteIllness(illness.id)}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
