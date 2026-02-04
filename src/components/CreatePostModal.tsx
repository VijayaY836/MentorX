import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Trophy, 
  TrendingUp, 
  MessageCircle, 
  PartyPopper, 
  Lightbulb,
  GraduationCap,
  Image,
  Link,
  Smile,
  BookOpen,
  HandHeart
} from 'lucide-react'
import { useUserData } from '@/hooks/useUserData'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePost: (post: NewPost) => void
}

export interface NewPost {
  content: string
  type: 'achievement' | 'milestone' | 'question' | 'celebration' | 'resource_share' | 'senior_guidance' | 'resource_offer' | 'resource_request'
  attachments?: string[]
  resourceDetails?: {
    title: string
    category: string
    description: string
    link?: string
    tags: string[]
  }
}

const postTypes = [
  {
    id: 'achievement' as const,
    name: 'Achievement',
    description: 'Share a personal accomplishment or milestone',
    icon: Trophy,
    color: 'bg-yellow-500',
    examples: ['Completed a certification', 'Got a new job', 'Finished a project']
  },
  {
    id: 'milestone' as const,
    name: 'Learning Milestone',
    description: 'Share progress on your learning journey',
    icon: TrendingUp,
    color: 'bg-blue-500',
    examples: ['50% through React course', 'Completed 100 coding challenges', 'Finished bootcamp']
  },
  {
    id: 'question' as const,
    name: 'Question',
    description: 'Ask the community for help or advice',
    icon: MessageCircle,
    color: 'bg-purple-500',
    examples: ['Need help with algorithms', 'Career advice needed', 'Technical question']
  },
  {
    id: 'celebration' as const,
    name: 'Celebration',
    description: 'Celebrate success and positive moments',
    icon: PartyPopper,
    color: 'bg-green-500',
    examples: ['Passed an interview', 'Got promoted', 'Launched a project']
  },
  {
    id: 'resource_share' as const,
    name: 'Resource Share',
    description: 'Share helpful resources with the community',
    icon: Lightbulb,
    color: 'bg-orange-500',
    examples: ['Useful tutorial', 'Great article', 'Helpful tool']
  },
  {
    id: 'resource_offer' as const,
    name: 'Resource Offer',
    description: 'Offer resources, mentorship, or help to others',
    icon: BookOpen,
    color: 'bg-teal-500',
    examples: ['Free course access', 'Mentorship offer', 'Code review help']
  },
  {
    id: 'resource_request' as const,
    name: 'Resource Request',
    description: 'Request specific resources or help from seniors',
    icon: HandHeart,
    color: 'bg-pink-500',
    examples: ['Need course recommendations', 'Looking for mentor', 'Seeking career advice']
  },
  {
    id: 'senior_guidance' as const,
    name: 'Senior Guidance',
    description: 'Share wisdom and advice from experience',
    icon: GraduationCap,
    color: 'bg-indigo-500',
    examples: ['Career transition tips', 'Leadership advice', 'Industry insights']
  }
]

export function CreatePostModal({ isOpen, onClose, onCreatePost }: CreatePostModalProps) {
  const { user } = useUserData()
  const [content, setContent] = useState('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Resource-specific fields
  const [resourceTitle, setResourceTitle] = useState('')
  const [resourceCategory, setResourceCategory] = useState('')
  const [resourceDescription, setResourceDescription] = useState('')
  const [resourceLink, setResourceLink] = useState('')
  const [resourceTags, setResourceTags] = useState('')

  const selectedPostType = postTypes.find(type => type.id === selectedType)
  const TypeIcon = selectedPostType?.icon || MessageCircle
  
  const isResourcePost = selectedType === 'resource_offer' || selectedType === 'resource_request'

  const handleSubmit = async () => {
    if (!content.trim() || !selectedType) {
      return
    }

    // Additional validation for resource posts
    if (isResourcePost && !resourceTitle.trim()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const newPost: NewPost = {
        content: content.trim(),
        type: selectedType as NewPost['type']
      }
      
      // Add resource details if it's a resource post
      if (isResourcePost) {
        newPost.resourceDetails = {
          title: resourceTitle.trim(),
          category: resourceCategory || 'General',
          description: resourceDescription.trim(),
          link: resourceLink.trim(),
          tags: resourceTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        }
      }
      
      onCreatePost(newPost)
      
      // Reset form
      setContent('')
      setSelectedType('')
      setResourceTitle('')
      setResourceCategory('')
      setResourceDescription('')
      setResourceLink('')
      setResourceTags('')
      onClose()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setContent('')
    setSelectedType('')
    setResourceTitle('')
    setResourceCategory('')
    setResourceDescription('')
    setResourceLink('')
    setResourceTags('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Create New Post</span>
            {selectedPostType && (
              <div className={`w-6 h-6 ${selectedPostType.color} rounded-lg flex items-center justify-center`}>
                <TypeIcon className="w-3 h-3 text-white" />
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            Share your progress, ask questions, or help others in the community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.profile.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{user.name}</span>
                <Badge variant="secondary" className="text-xs">
                  Level {user.progress.level}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Posting to Learning Community
              </div>
            </div>
          </div>

          {/* Post Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Post Category</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a post category" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 ${type.color} rounded flex items-center justify-center`}>
                          <Icon className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            
            {selectedPostType && (
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedPostType.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Examples:</span> {selectedPostType.examples.join(', ')}
                </div>
              </div>
            )}
          </div>

          {/* Resource-Specific Fields */}
          {isResourcePost && (
            <div className="space-y-4 p-4 bg-accent/20 rounded-lg border border-accent">
              <h3 className="font-semibold text-sm">Resource Details</h3>
              
              {/* Resource Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Resource Title *
                </label>
                <input
                  type="text"
                  placeholder={selectedType === 'resource_offer' ? 'What resource are you offering?' : 'What resource do you need?'}
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background"
                  maxLength={100}
                />
              </div>

              {/* Resource Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={resourceCategory} onValueChange={setResourceCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Certification">Certification</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                    <SelectItem value="Mentorship">Mentorship</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Resource Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Provide more details about the resource..."
                  value={resourceDescription}
                  onChange={(e) => setResourceDescription(e.target.value)}
                  className="min-h-[80px] resize-none"
                  maxLength={300}
                />
              </div>

              {/* Resource Link (for offers) */}
              {selectedType === 'resource_offer' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://example.com/resource"
                    value={resourceLink}
                    onChange={(e) => setResourceLink(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="javascript, react, beginner, free"
                  value={resourceTags}
                  onChange={(e) => setResourceTags(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background"
                />
              </div>
            </div>
          )}

          {/* Content Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              What would you like to share?
            </label>
            <Textarea
              placeholder={
                selectedPostType 
                  ? `Share your ${selectedPostType.name.toLowerCase()}...`
                  : "What's on your mind?"
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{content.length}/500 characters</span>
              {content.length > 450 && (
                <span className="text-orange-500">
                  {500 - content.length} characters remaining
                </span>
              )}
            </div>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Add to your post:</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" disabled>
                <Image className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <Link className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview */}
          {content && selectedType && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Preview</label>
              <div className="p-4 border border-border rounded-lg bg-background">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.profile.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-sm">{user.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        Level {user.progress.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">now</span>
                    </div>
                    <p className="text-sm leading-relaxed">{content}</p>
                  </div>
                  <div className={`w-6 h-6 ${selectedPostType?.color} rounded flex items-center justify-center`}>
                    <TypeIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim() || !selectedType || (isResourcePost && !resourceTitle.trim()) || isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? 'Posting...' : 'Share Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}