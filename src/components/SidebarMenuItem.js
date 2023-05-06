/*
 * -----------------------------
 * File - SidebarMenuItem.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: sidebar menu item component
 * -----------------------------
 */
// A functional component that returns a sidebar menu item
export default function SidebarMenuItem({ text, Icon, active }) {
  return (
    // The menu item is a div with class names that define its appearance and behavior
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      {/* The icon is rendered using the provided Icon prop */}
      <Icon className="h-7 !important" />
      {/* The text is rendered using the provided text prop, and is bold if the active prop is true */}
      <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span>
    </div>
  );
}
