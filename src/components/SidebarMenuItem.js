/*
 * -----------------------------
 * File - SidebarMenuItem.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
export default function SidebarMenuItem({ text, Icon, active }) { // Returns a sidebar menu item 
  return (
    <div className='hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3'>
      {/*TODO:: Turn this into button */}
      <Icon className='h-7 !important' />
      <span className={`${active && 'font-bold'} hidden xl:inline`}>{text}</span>
    </div>
  );
}
