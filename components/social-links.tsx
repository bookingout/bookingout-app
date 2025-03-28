import { Facebook, Instagram, Twitter } from "lucide-react"

interface SocialLinksProps {
  title?: string
  links: {
    platform: "facebook" | "instagram" | "twitter"
    url: string
  }[]
}

export default function SocialLinks({ title, links }: SocialLinksProps) {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="w-6 h-6" />
      case "instagram":
        return <Instagram className="w-6 h-6" />
      case "twitter":
        return <Twitter className="w-6 h-6" />
      default:
        return null
    }
  }

  return (
    <div className="text-center">
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}

      <div className="flex justify-center gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
            aria-label={link.platform}
          >
            {getIcon(link.platform)}
          </a>
        ))}
      </div>
    </div>
  )
}

