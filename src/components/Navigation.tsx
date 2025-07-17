import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Trophy, 
  Users, 
  Upload, 
  Coins,
  Settings,
  Menu
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation: React.FC = () => {
  const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'Leaderboard', icon: Trophy, href: '#leaderboard' },
    { name: 'Community', icon: Users, href: '#community' },
    { name: 'Upload', icon: Upload, href: '#upload' },
    { name: 'Rewards', icon: Coins, href: '#rewards' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-800/30 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gaming-gradient flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-purple">MEME WARRIOR</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-purple-800/20 transition-colors"
                asChild
              >
                <a href={item.href} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </a>
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              className="bg-gaming-gradient hover:glow-purple hover-scale hidden sm:flex"
            >
              <Coins className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            
            {/* Mobile Menu */}
            <NavigationMenu className="md:hidden">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <Menu className="w-5 h-5" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-2">
                      {navItems.map((item) => (
                        <NavigationMenuLink
                          key={item.name}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-800/20 text-sm"
                          href={item.href}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </NavigationMenuLink>
                      ))}
                      <div className="border-t border-purple-800/30 mt-2 pt-2">
                        <NavigationMenuLink
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-800/20 text-sm"
                          href="#wallet"
                        >
                          <Coins className="w-4 h-4" />
                          Connect Wallet
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;