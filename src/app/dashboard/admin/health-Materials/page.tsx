"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  createBook, updateBook, deleteBook, getBooks,
  createTechNews, updateTechNews, deleteTechNews, getTechNews,
  createYouTubeVideo, updateYouTubeVideo, deleteYouTubeVideo, getYouTubeVideos
} from "@/actions/BooksYogsVideo";

interface Book {
  id: string;
  title: string;
  author: string;
  url: string;
  description: string;
  image: string;
}

interface TechNews {
  id: string;
  name: string;
  url: string;
  gif: string;
}

interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail: string;
}

export default function AdminContent() {
  // Books state
  const [books, setBooks] = useState<Book[]>([]);
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    url: "",
    description: "",
    image: "",
  });
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [isBookLoading, setIsBookLoading] = useState(false);
  const [isDeletingBook, setIsDeletingBook] = useState(false);

  // TechNews state
  const [techNews, setTechNews] = useState<TechNews[]>([]);
  const [techNewsForm, setTechNewsForm] = useState({
    name: "",
    url: "",
    gif: "",
  });
  const [editingTechNewsId, setEditingTechNewsId] = useState<string | null>(null);
  const [isTechNewsLoading, setIsTechNewsLoading] = useState(false);
  const [isDeletingTechNews, setIsDeletingTechNews] = useState(false);

  // YouTube Videos state
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [videoForm, setVideoForm] = useState({
    title: "",
    url: "",
    description: "",
    thumbnail: "",
  });
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isDeletingVideo, setIsDeletingVideo] = useState(false);

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [booksData, techNewsData, videosData] = await Promise.all([
        getBooks(),
        getTechNews(),
        getYouTubeVideos()
      ]);
      setBooks(booksData);
      setTechNews(techNewsData);
      console.log("Fetched videos:", videosData);
      setVideos(videosData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  // Books handlers
  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookLoading(true);
    try {
      // Validate image URL length
      if (bookForm.image.length > 500) {
        toast.error("Image URL is too long. Please use a shorter URL.");
        return;
      }

      if (editingBookId) {
        await updateBook(editingBookId, bookForm);
        toast.success("Book updated successfully");
      } else {
        await createBook(bookForm);
        toast.success("Book created successfully");
      }
      setBookForm({ title: "", author: "", url: "", description: "", image: "" });
      setEditingBookId(null);
      fetchAllData();
    } catch (error: any) {
      console.error("Error saving book:", error);
      toast.error(error.message || "Failed to save book");
    } finally {
      setIsBookLoading(false);
    }
  };

  const handleBookDelete = async (id: string) => {
    setIsDeletingBook(true);
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully");
      fetchAllData();
    } catch (error: any) {
      console.error("Error deleting book:", error);
      toast.error(error.message || "Failed to delete book");
    } finally {
      setIsDeletingBook(false);
    }
  };

  // TechNews handlers
  const handleTechNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTechNewsLoading(true);
    try {
      // Validate GIF URL length
      if (techNewsForm.gif.length > 500) {
        toast.error("GIF URL is too long. Please use a shorter URL.");
        return;
      }

      if (editingTechNewsId) {
        await updateTechNews(editingTechNewsId, techNewsForm);
        toast.success("Tech News updated successfully");
      } else {
        await createTechNews(techNewsForm);
        toast.success("Tech News created successfully");
      }
      setTechNewsForm({ name: "", url: "", gif: "" });
      setEditingTechNewsId(null);
      fetchAllData();
    } catch (error: any) {
      console.error("Error saving tech news:", error);
      toast.error(error.message || "Failed to save tech news");
    } finally {
      setIsTechNewsLoading(false);
    }
  };

  const handleTechNewsDelete = async (id: string) => {
    setIsDeletingTechNews(true);
    try {
      await deleteTechNews(id);
      toast.success("Tech News deleted successfully");
      fetchAllData();
    } catch (error: any) {
      console.error("Error deleting tech news:", error);
      toast.error(error.message || "Failed to delete tech news");
    } finally {
      setIsDeletingTechNews(false);
    }
  };

  // YouTube Video handlers
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVideoLoading(true);
    try {
      // Validate thumbnail URL length
      if (videoForm.thumbnail.length > 500) {
        toast.error("Thumbnail URL is too long. Please use a shorter URL.");
        return;
      }

      if (editingVideoId) {
        await updateYouTubeVideo(editingVideoId, videoForm);
        toast.success("Video updated successfully");
      } else {
        await createYouTubeVideo(videoForm);
        toast.success("Video created successfully");
      }
      setVideoForm({ title: "", url: "", description: "", thumbnail: "" });
      setEditingVideoId(null);
      fetchAllData();
    } catch (error: any) {
      console.error("Error saving video:", error);
      toast.error(error.message || "Failed to save video");
    } finally {
      setIsVideoLoading(false);
    }
  };

  const handleVideoDelete = async (id: string) => {
    setIsDeletingVideo(true);
    try {
      await deleteYouTubeVideo(id);
      toast.success("Video deleted successfully");
      fetchAllData();
    } catch (error: any) {
      console.error("Error deleting video:", error);
      toast.error(error.message || "Failed to delete video");
    } finally {
      setIsDeletingVideo(false);
    }
  };

  return (
    <div className=" p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>

      {/* Books Section */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Books Management</h2>
        <form onSubmit={handleBookSubmit} className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Book Title"
              value={bookForm.title}
              onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
              required
              maxLength={100}
            />
            <Input
              placeholder="Author"
              value={bookForm.author}
              onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
              required
              maxLength={100}
            />
            <Input
              placeholder="Book URL"
              value={bookForm.url}
              onChange={(e) => setBookForm({ ...bookForm, url: e.target.value })}
              required
              maxLength={500}
            />
            <Input
              placeholder="Image URL"
              value={bookForm.image}
              onChange={(e) => setBookForm({ ...bookForm, image: e.target.value })}
              required
              maxLength={500}
            />
          </div>
          <Textarea
            placeholder="Book Description"
            value={bookForm.description}
            onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
            required
            className="min-h-[100px]"
            maxLength={1000}
          />
          <Button type="submit" disabled={isBookLoading}>
            {isBookLoading ? "Loading..." : (editingBookId ? "Update Book" : "Add Book")}
          </Button>
        </form>

        <div className="h-[300px] overflow-y-auto border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <div key={book.id} className="border rounded-lg p-4 space-y-2">
                <img src={book.image} alt={book.title} className="w-full h-32 object-cover rounded-lg" />
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setBookForm({
                        title: book.title,
                        author: book.author,
                        url: book.url,
                        description: book.description,
                        image: book.image,
                      });
                      setEditingBookId(book.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="dangerOutline"
                    onClick={() => handleBookDelete(book.id)}
                    disabled={isDeletingBook}
                  >
                    {isDeletingBook ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TechNews Section */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Tech News Management</h2>
        <form onSubmit={handleTechNewsSubmit} className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Tech News Name"
              value={techNewsForm.name}
              onChange={(e) => setTechNewsForm({ ...techNewsForm, name: e.target.value })}
              required
              maxLength={100}
            />
            <Input
              placeholder="URL"
              value={techNewsForm.url}
              onChange={(e) => setTechNewsForm({ ...techNewsForm, url: e.target.value })}
              required
              maxLength={500}
            />
            <Input
              placeholder="GIF URL"
              value={techNewsForm.gif}
              onChange={(e) => setTechNewsForm({ ...techNewsForm, gif: e.target.value })}
              required
              maxLength={500}
            />
          </div>
          <Button type="submit" disabled={isTechNewsLoading}>
            {isTechNewsLoading ? "Loading..." : (editingTechNewsId ? "Update Tech News" : "Add Tech News")}
          </Button>
        </form>

        <div className="h-[300px] overflow-y-auto border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techNews.map((news) => (
              <div key={news.id} className="border rounded-lg p-4 space-y-2">
                <img src={news.gif} alt={news.name} className="w-full h-32 object-cover rounded-lg" />
                <h3 className="font-semibold">{news.name}</h3>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTechNewsForm({
                        name: news.name,
                        url: news.url,
                        gif: news.gif,
                      });
                      setEditingTechNewsId(news.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="dangerOutline"
                    onClick={() => handleTechNewsDelete(news.id)}
                    disabled={isDeletingTechNews}
                  >
                    {isDeletingTechNews ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Videos Section */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">YouTube Videos Management</h2>
        <form onSubmit={handleVideoSubmit} className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Video Title"
              value={videoForm.title}
              onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
              required
              maxLength={100}
            />
            <Input
              placeholder="Video URL"
              value={videoForm.url}
              onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
              required
              maxLength={500}
            />
            <Input
              placeholder="Thumbnail URL"
              value={videoForm.thumbnail}
              onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
              required
              maxLength={500}
            />
          </div>
          <Textarea
            placeholder="Video Description"
            value={videoForm.description}
            onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
            required
            className="min-h-[100px]"
            maxLength={1000}
          />
          <Button type="submit" disabled={isVideoLoading}>
            {isVideoLoading ? "Loading..." : (editingVideoId ? "Update Video" : "Add Video")}
          </Button>
        </form>

        <div className="h-[300px] overflow-y-auto border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => {
              // Extract video ID from URL if it's a full YouTube URL
              const getThumbnailUrl = (url: string) => {
                if (url.includes('youtube.com/watch?v=')) {
                  const videoId = url.split('v=')[1].split('&')[0];
                  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                }
                return url;
              };

              return (
                <div key={video.id} className="border rounded-lg p-4 space-y-2">
                  <img 
                    src={getThumbnailUrl(video.thumbnail)} 
                    alt={video.title} 
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      // If maxresdefault fails, try hqdefault
                      if (e.currentTarget.src.includes('maxresdefault')) {
                        e.currentTarget.src = e.currentTarget.src.replace('maxresdefault', 'hqdefault');
                      } else {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Thumbnail";
                      }
                    }}
                  />
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setVideoForm({
                          title: video.title,
                          url: video.url,
                          description: video.description,
                          thumbnail: video.thumbnail,
                        });
                        setEditingVideoId(video.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="dangerOutline"
                      onClick={() => handleVideoDelete(video.id)}
                      disabled={isDeletingVideo}
                    >
                      {isDeletingVideo ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 