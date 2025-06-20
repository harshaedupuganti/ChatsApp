import React from 'react';
import { MessageCircle, Search, Settings } from 'lucide-react';
import { NavigationItem } from '../types';

interface NavigationProps {
  onSearchClick: () => void;
}

/**
 * Navigation Component
 * Fixed bottom navigation with 3-icon layout and active states
 * Height: 56px with touch-optimized button areas
 */
const Navigation: React.FC<NavigationProps> = ({ onSearchClick }) => {
  const [activeTab, setActiveTab] = React.useState('chats');

  const navigationItems: NavigationItem[] = [
    {
      id: 'chats',
      label: 'Chats',
      icon: 'MessageCircle',
      isActive: activeTab === 'chats',
      badge: 3
    },
    {
      id: 'search',
      label: 'Search',
      icon: 'Search',
      isActive: activeTab === 'search'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      isActive: activeTab === 'settings'
    }
  ];

  const handleTabClick = (tabId: string) => {
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    if (tabId === 'search') {
      onSearchClick();
    } else {
      setActiveTab(tabId);
      console.log(`Navigated to ${tabId}`);
    }
  };

  const getIcon = (iconName: string, isActive: boolean) => {
    const iconProps = {
      className: `w-6 h-6 transition-colors duration-200 ${
        isActive ? 'text-blue-600' : 'text-gray-500'
      }`,
      strokeWidth: isActive ? 2.5 : 2
    };

    switch (iconName) {
      case 'MessageCircle':
        return <MessageCircle {...iconProps} />;
      case 'Search':
        return <Search {...iconProps} />;
      case 'Settings':
        return <Settings {...iconProps} />;
      default:
        return <MessageCircle {...iconProps} />;
    }
  };

  return (
    <nav 
      className="navigation fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navigation__container h-14 px-4">
        <ul className="flex items-center justify-around h-full">
          {navigationItems.map((item) => (
            <li key={item.id} className="navigation__item">
              <button
                onClick={() => handleTabClick(item.id)}
                className={`navigation__button relative flex flex-col items-center justify-center min-h-[44px] px-3 py-1 rounded-lg transition-all duration-200 ${
                  item.isActive 
                    ? 'bg-blue-50 text-blue-600 scale-105' 
                    : 'text-gray-500 hover:bg-gray-50 active:scale-95'
                }`}
                aria-label={item.label}
                aria-current={item.isActive ? 'page' : undefined}
                data-testid={`nav-${item.id}`}
              >
                {/* Icon Container */}
                <div className="relative mb-1">
                  {getIcon(item.icon, item.isActive)}
                  
                  {/* Badge */}
                  {item.badge && (
                    <span 
                      className="navigation__badge absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                      aria-label={`${item.badge} notifications`}
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                
                {/* Label */}
                <span 
                  className={`navigation__label text-xs font-medium transition-colors duration-200 ${
                    item.isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active Indicator */}
                {item.isActive && (
                  <div 
                    className="navigation__indicator absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;