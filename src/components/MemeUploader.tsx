
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { uploadToServer } from '@/lib/cloudinary';

interface MemeUploaderProps {
  onUpload: () => void;
}

const MemeUploader: React.FC<MemeUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const { publicKey } = useWallet();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (max 4MB)
      if (selectedFile.size > 4 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Maximum file size is 4MB",
          variant: "destructive"
        });
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !publicKey) {
      toast({
        title: "Missing Info",
        description: "Please connect your wallet, select a file and add a title",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      await uploadToServer(file, {
        title,
        description,
        creator: publicKey.toString(),
      });

      onUpload();
      
      toast({
        title: "Meme Uploaded! 🔥",
        description: "+100 XP earned! Your meme is now live.",
      });
      
      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setPreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload meme. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Meme
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              id="title"
              placeholder="Meme Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {preview && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={preview}
                alt="Preview"
                className="object-cover"
              />
            </div>
          )}
          <Button 
            onClick={handleUpload}
            disabled={isUploading || !file || !title}
            className="w-full"
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 animate-pulse" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Upload Meme
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeUploader;
