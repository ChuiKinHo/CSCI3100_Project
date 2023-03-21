import {BellIcon, BookmarkIcon, ClipboardIcon, DotsHorizontalIcon, EllipsisHorizontalCircleIcon, HashtagIcon, HomeIcon, InboxIcon, UserIcon} from '@heroicons/react/20/solid';
import Image from 'next/image';

import SidebarMenuItem from './SidebarMenuItem';

export default function Sidebar() {
  return (
      <div className =
           'hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>{
          /* Twitter Logo */}<
          div className = 'hoverEffect p-0 hover:bg-blue-100 xl:px-1'>
      <Image width = {50} height = {50} src =
           'https://help.twitter.com/content/dam/help-twitter/brand/logo.png' alt =
               'Twitter logo' />
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
      <SidebarMenuItem text = 'Explore' Icon =
       {
         HashtagIcon
       } />

        <>
          <SidebarMenuItem text="Notifications" Icon={BellIcon} />
      <SidebarMenuItem text = 'Messages' Icon =
       {
         InboxIcon
       } />
          <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
      <SidebarMenuItem text = 'Lists' Icon =
       {
         ClipboardIcon
       } />
          <SidebarMenuItem text="Profile" Icon={UserIcon} />
      <SidebarMenuItem text = 'More' Icon = {
        EllipsisHorizontalCircleIcon
      } />
        </></div>
    </div>);
}
