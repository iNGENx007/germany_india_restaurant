import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Load main menu
    const mainMenuPath = path.join(process.cwd(), 'taj_mahal_menu.json');
    const mainMenuData = await fs.readFile(mainMenuPath, 'utf8');
    const mainMenu = JSON.parse(mainMenuData);

    // Load mittagskarte (lunch menu)
    const mittagskartePath = path.join(process.cwd(), 'mittagskarte_menu.json');
    const mittagskarteData = await fs.readFile(mittagskartePath, 'utf8');
    const mittagskarte = JSON.parse(mittagskarteData);

    // Merge the sections from both menus
    const combinedMenu = {
      restaurant: mainMenu.restaurant,
      currency: mainMenu.currency,
      sections: [
        ...mittagskarte.sections, // Add lunch menu sections first
        ...mainMenu.sections       // Then add main menu sections
      ]
    };

    return NextResponse.json(combinedMenu, { status: 200 });
  } catch (err) {
    console.error('Menu loading error:', err);
    return NextResponse.json({ error: 'Failed to load menu JSON' }, { status: 500 });
  }
}


