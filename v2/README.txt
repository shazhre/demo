THE THREAD STORIES – HOMEPAGE (static HTML)
=============================================

How to view
-----------
Unzip the folder and double-click index.html. It opens in any browser.
An internet connection is needed only for the fonts (Google Fonts:
Playfair Display for headings and Poppins for text); everything else is
inside this folder.

Files
-----
index.html        Page structure and all fixed text
css/styles.css    All styles, colours and the responsive layout
js/main.js        Banner slider, menus, category carousel, product cards,
                  size selection, add to bag, the mobile menu, the quick-add
                  sheet and the scroll animations
images/           Product photos (resized for web) and the logo

Colours (top of css/styles.css)
-------------------------------
--accent  #B0126F  magenta: buttons, Sale, highlights
--teal    #0E6B6B  collection block, footer
--gold    #D4A017  "New" badges, gold buttons
--bg      #FFF8F5  page background
--ink     #24161F  text

Screen sizes
------------
1280px and wider   full desktop header (menu left, name centred, icons right),
                   5 categories at a time
1024–1279px        same layout, smaller menu text and name, 4 categories
under 1024px       tablet/mobile: centred name only, bottom menu bar, menu
                   links moved into the menu drawer, 3 columns on tablet,
                   2 on phones, quick-add "+" button

Things to replace before going live (search the files for "[")
--------------------------------------------------------------
- Prices: OMR [PRICE] and OMR [SALE PRICE]
- Delivery offer amount: OMR [AMOUNT]
- Size chart measurements: [ ]
- [Collection name] and its description
- [Delivery time and fee], [Exchange policy]
- [WhatsApp number], [WhatsApp community invite link], [Email address]
- Product names in js/main.js are examples based on the photos
- "Only 2 left in …" and sold-out sizes are example stock data

Animations
----------
Banner: 3 slides, auto-advance every 6 s, arrows, progress bars and swipe.
Categories: a scroll strip that follows the finger and snaps to tiles.
Images, titles and text animate each time they scroll into view.
All motion is switched off for visitors who ask their device to reduce motion.
Banner slide text lives in index.html (section id="top").

Notes for the developer
-----------------------
- Homepage categories, products and menus are plain data arrays at the top of
  js/main.js (CATEGORIES, NEW_ARRIVALS, BEST_SELLERS, MENUS, RAIL). Replace
  them with data from your shop platform or admin panel.
- "Add to bag" only updates the bag count and shows a confirmation; connect it
  to your cart/checkout.
- Links to product pages, the bag, account, search and WhatsApp are "#"
  placeholders.
- Categories marked "Photo coming soon" have no photo yet: add an image file
  name in CATEGORIES / RAIL.
