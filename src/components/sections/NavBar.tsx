import { useAuthStore } from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, Cog, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NavBar = () => {
  const { user } = useAuthStore();
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 bg-blue-500">
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 w-[300px]"
              placeholder="Search for friends here..."
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="avatar"
            />
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user?.username}</span>
          <Button size="icon" variant="ghost">
            <Cog className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <User className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
