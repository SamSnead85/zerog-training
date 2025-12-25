import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn, getInitials, stringToColor } from "@/lib/utils";

const avatarVariants = cva(
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground",
    {
        variants: {
            size: {
                xs: "h-6 w-6 text-[10px]",
                sm: "h-8 w-8 text-xs",
                default: "h-10 w-10 text-sm",
                lg: "h-12 w-12 text-base",
                xl: "h-16 w-16 text-lg",
                "2xl": "h-20 w-20 text-xl",
            },
            ring: {
                none: "",
                default: "ring-2 ring-border ring-offset-2 ring-offset-background",
                primary: "ring-2 ring-primary ring-offset-2 ring-offset-background",
            },
        },
        defaultVariants: {
            size: "default",
            ring: "none",
        },
    }
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
    src?: string | null;
    alt?: string;
    name?: string;
    className?: string;
}

function Avatar({ src, alt, name, size, ring, className }: AvatarProps) {
    const initials = name ? getInitials(name) : "?";
    const bgColor = name ? stringToColor(name) : undefined;

    return (
        <div className={cn(avatarVariants({ size, ring }), className)}>
            {src ? (
                <Image
                    src={src}
                    alt={alt || name || "Avatar"}
                    fill
                    className="object-cover"
                />
            ) : (
                <span style={{ backgroundColor: bgColor }}>{initials}</span>
            )}
        </div>
    );
}

export interface AvatarGroupProps {
    avatars: AvatarProps[];
    max?: number;
    size?: VariantProps<typeof avatarVariants>["size"];
    className?: string;
}

function AvatarGroup({ avatars, max = 5, size = "default", className }: AvatarGroupProps) {
    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    return (
        <div className={cn("flex -space-x-3", className)}>
            {visibleAvatars.map((avatar, index) => (
                <Avatar
                    key={index}
                    {...avatar}
                    size={size}
                    ring="default"
                    className="hover:z-10"
                />
            ))}
            {remainingCount > 0 && (
                <div
                    className={cn(
                        avatarVariants({ size }),
                        "z-0 flex items-center justify-center bg-muted text-muted-foreground ring-2 ring-border ring-offset-2 ring-offset-background"
                    )}
                >
                    +{remainingCount}
                </div>
            )}
        </div>
    );
}

export { Avatar, AvatarGroup, avatarVariants };
