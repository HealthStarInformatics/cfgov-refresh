import {
  scrollIntoView,
  scrollTo
} from '../../../../js/modules/util/scroll';
import DT from './dom-tools';
import { assign } from '../../../../js/modules/util/assign';
import { closest } from '../../../../js/modules/util/dom-traverse';

const EXPLAIN_TYPES = {
  CHECKLIST:   'checklist',
  DEFINITIONS: 'definitions'
};

const CSS = {
  // EXPLAIN_PAGE_FIXED:    'explain_page__fixed',
  // EXPLAIN_PAGE_ABSOLUTE: 'explain_page__absolute',
  HAS_ATTENTION:         'has-attention',
  HOVER_HAS_ATTENTION:   'hover-has-attention'
};

const NO_OP = () => {
  // Placeholder function meant to be overridden.
};

let UNDEFINED;

/**
 * FormExplainer
 * @class
 *
 * @classdesc Initializes a new Form Explainer.
 *
 * @param {HTMLNode} element - Base DOM element.
 * @param {Object} options - Configuration options.
 * @returns {Object} An Form Explainer instance.
 */
class FormExplainer {
  constructor( element, options = {} ) {
    this.currentPage = options.currentPage || 1;
    this.elements = {};
    this.elements.base = element;
  }

  /**
   * Initialize the FormExplainer.
   * @returns {FormExplainer} An instance.
   */
  init() {
    this.setPageCount();
    this.setCurrentPage( this.currentPage, UNDEFINED, false );
    this.setUIElements();
    this.initializeUI( this.elements );
    this.initializeEvents();

    return this;
  }

  /**
   * Initialize the UI after instatiation.
   * @param {HTMLNodes} elements - Current page DOM elements.
   */
  initializeUI( elements ) {
    DT.applyAll(
      elements.pages,
      ( value, index ) => {
        const _index = index + 1;
        this.updateImageUI( _index, true );
      }
    );

    this.updatePageUI( elements.initialTab, EXPLAIN_TYPES.CHECKLIST );

    // NOTE: do we have to assume expandables? 
    // CAN WE dispatch an event instead?
    // eslint-disable-next-line global-require
    require( 'cf-expandables/src/Expandable' ).init();
  }

  /**
   * Update the image UI for the current page.
   * @param {number} pageNum - Current page number.
   * @param {boolean} isPageLoad - Whether this is the initial page load.
   */
  updateImageUI( pageNum, isPageLoad ) {
    const elements = this.getPageElements( pageNum );

    if ( window.innerWidth > 600 ) {

      /* update widths & position on larger screens
         we only pass in the pageNum on pageLoad, when
         pages after the first will be hidden once they're
         fully loaded & we've calculated their widths */
      this.fitToWindow( elements, isPageLoad ? pageNum : null );
    } else if ( !isPageLoad ) {
      // NOTE: what's all this about?
      // Can we break this out into resize & page load
      /* if this is called on screen resize instead of page load,
         remove width values & call unstick on the imageWrapper */
      
      // DT.removeClass( elements.imageMapWrapper, CSS.EXPLAIN_PAGE_FIXED );
    } else if ( pageNum > 1 ) {

      // on page load, hide pages except first
      DT.hide( elements.page );
    }
  }

  /**
   * Update the pagination UI.
   */
  updatePaginationUI( ) {
    const BTN_DISABLED = 'a-btn__disabled';
    const PAGE_BTN_CTR = '.form-explainer_page-buttons';


    if ( this.pageCount > 1 ) {
      DT.removeClass( PAGE_BTN_CTR + ' button', BTN_DISABLED );
      if ( this.currentPage === 1 ) {
        DT.addClass( PAGE_BTN_CTR + ' .prev', BTN_DISABLED );
      } else if ( this.currentPage === this.pageCount ) {
        DT.addClass( PAGE_BTN_CTR + ' .next', BTN_DISABLED );
      }
    }
  }

  /**
   * Update the page UI for the give explainer type.
   * @param {string} currentTab - Name of current tab.
   * @param {string} explainerType - Type of form explainer.
   */
  updatePageUI( currentTab, explainerType ) {
    this.updateTabsUI( currentTab );

    DT.hide( '.o-expandable__form-explainer' );
    DT.show( '.o-expandable__form-explainer-' + explainerType );
    DT.hide( '.image-map_overlay' );
    DT.show( '.image-map_overlay__' + explainerType );
  }

  /**
   * Update the tabs UI.
   * @param {string} currentTab - Name of current tab.
   */
  updateTabsUI( currentTab ) {

    // Update the tab state
    DT.removeClass( '.explain_tabs .tab-list', 'active-tab' );
    DT.addClass( currentTab, 'active-tab' );
  }

 

  /* Update attention classes based on the expandable or image overlay
   that was targeted.
   Remove the attention class from all the expandables/overlays,
   and then apply it to the target & its associated overlay
   or expandable.
   * @param {HTMLNode} target - Overlay or expandable DOM node.
   * @param {string} className - Hover class name.
   */
  updateAttention( target, className ) {
    let associated;
    const targetId = target.getAttribute( 'id' );

    DT.removeClass(
      '.o-expandable__form-explainer, .image-map_overlay',
      className
    );

    if ( target.getAttribute( 'href' ) !== null ) {
      associated = DT.getEl( target.getAttribute( 'href' ) );
    } else if ( targetId !== null ) {
      associated = DT.getEl( '[href="#' + targetId + '"]' );
    }

    if ( associated !== null ) {
      if ( className === CSS.HAS_ATTENTION ) {
        DT.removeClass( target, CSS.HOVER_HAS_ATTENTION );
        DT.removeClass( associated, CSS.HOVER_HAS_ATTENTION );
      }
      DT.addClass( target, className );
      DT.addClass( associated, className );
    }
  }

  /**
   * Open the expandable and scroll into the viewport.
   * @param {HTMLNode} imageOverlay - Image overlay, which was clicked.
   * @param {HTMLNode} targetExpandable - Target expandable.
   * current focus.
   */
  openAndScrollToExpandable( imageOverlay, targetExpandable ) {
    const targetExpandableTarget = targetExpandable.querySelector(
      '.o-expandable_target'
    );

    window.setTimeout( () => {
      scrollIntoView(
        targetExpandableTarget,
        { duration: 500, callback: () => targetExpandableTarget.focus() }
      );
    }, 150 );
    window.setTimeout( () => targetExpandableTarget.click(), 0 );
  }

  /**
   * Return page elements based on the page number.
   * @param {Object} pageNum - Current page number.
   * @returns {Object} DOM elements for the page.
   */
  getPageElements( pageNum ) {
    const element = this.getPageEl( pageNum );

    return {
      page: element,
      imageMap: element.querySelector( '.image-map' ),
      imageMapImage: element.querySelector( '.image-map_image' ),
      imageMapWrapper: element.querySelector( '.image-map_wrapper' ),
      terms: element.querySelectorAll( '.terms' )
    };
  }

  /**
   * Set the UI elements for the page
   * @returns {Object} DOM elements for the page.
   */
  setUIElements() {
    const explain = DT.getEl( '.explain' );
    const explainTabs = explain.querySelector( '.explain_tabs' );
    const explainPagination = explain.querySelector( '.explain_pagination' );
    const explainPageBtns = explain.querySelectorAll(
      '.form-explainer_page-buttons button'
    );
    const tabLink = explain.querySelector(
      '.tab-link[data-target="' + EXPLAIN_TYPES.CHECKLIST + '"]'
    );
    const initialTab = closest( tabLink, '.tab-list' );
    const tabList = explain.querySelectorAll( '.explain_tabs .tab-list' );
    const pages = explain.querySelectorAll( '.explain_page' );
    const formExplainerLinks = explain.querySelectorAll(
      '.form-explainer_page-link'
    );

    return assign( this.elements,
      { explain,
        explainPageBtns,
        explainPagination,
        explainTabs,
        formExplainerLinks,
        initialTab,
        pages,
        tabLink,
        tabList
      }
    );
  }

  /**
   * Return explainer page element based on page number.
   * @param {number} pageNum - Number of explainer page.
   * @returns {Object} Page DOM element.
   */
  getPageEl( pageNum ) {
    return DT.getEl( `#explain_page-${ pageNum }` );
  }
  


  /**
   * Limit .image-map_image to the height of the window and then adjust the two
   * columns to match.
   * @param {HTMLNodes} elements - Current page DOM elements.
   * @param {number} pageNum - Current page number.
  */
  fitToWindow( elements, pageNum ) {
    // show the first page
    if ( pageNum > 1 ) {
      DT.hide( elements.page );
    }
  }
  

  /**
   * Paginate through the various form pages.
   * @param {string} direction - 'next' or 'prev'.
   */
  paginate( direction ) {
    const currentPage = this.currentPage;
    const increment = direction === 'next' ? 1 : -1;
    const newPage = currentPage + increment;

    // Move to the next or previous page if it's not the first or last page.
    if ( ( direction === 'next' && newPage <= this.pageCount ) ||
         ( direction === 'prev' && newPage >= 1 ) ) {
      this.switchPage( currentPage, newPage );
    }
  }

  /**
   * Paginate through the various form pages.
   * @param {number} pageNum - Number of the current page.
   * @param {function} callback - Function to invode after scroll.
   * @param {boolean} shouldScrollIntoView - Whether to scroll the page into view.
   */
  setCurrentPage( pageNum, callback, shouldScrollIntoView = true ) {
    const CURRENT_PAGE = 'current-page';
    const PAGE_LINK = '.form-explainer_page-link';
    const PAGINATION = '.explain_pagination';
    const CURRENT_PAGE_LINK =
      '.form-explainer_page-link[data-page="' + pageNum + '"]';

    this.currentPage = parseInt( pageNum, 10 );
    this.elements.currentPage = this.getPageEl( pageNum );
    assign( this.elements, this.getPageElements( pageNum ) );

    DT.removeClass( PAGE_LINK, CURRENT_PAGE );
    DT.addClass( CURRENT_PAGE_LINK, CURRENT_PAGE );
    this.updatePaginationUI();

    if ( shouldScrollIntoView ) {
      scrollIntoView(
        DT.getEl( PAGINATION ),
        { duration: 200,
          callback: callback || NO_OP
        }
      );
    }
  }

  /**
   * Paginate through the various form pages.
   * @param {number} pageCount - Number of pages.
   */
  setPageCount( pageCount ) {
    const pages = DT.getEls( '.explain_page' );
    this.pageCount = pageCount || pages.length;
  }

  /**
   * Switch pages by fading pages in / out and
   * updating the UI accordingly.
   * @param {number} currentPage - Current page Number.
   * @param {number} newPage - New page number.
   */
  switchPage( currentPage, newPage ) {
    this.setCurrentPage( newPage, () => {
      // After scrolling the window, fade out the current page.
      DT.fadeOut( this.getPageEl( currentPage ), 600,
        () => {
          DT.fadeIn( this.getPageEl( newPage ), 700 );
          this.updateImageUI( newPage );
        } );
    } );
  }


  /* Initialize the DOM events for the entire explainer UI. */
  initializeEvents() {
    const uiElements = this.elements;
    const delay = 700;

    /* When a paginantion link is clicked,
     * switch to the next / previous page.
     */
    DT.bindEvents( uiElements.explainPageBtns, 'click', event => {
      const target = event.currentTarget;

      if ( !DT.hasClass( target, 'disabled' ) ) {
        const direction = DT.hasClass( target, 'prev' ) ? 'prev' : 'next';
        this.paginate( direction );
      }
    } );

    /* When a page navigation link is clicked,
     * switch to the appropriate page.
     */
    DT.bindEvents( uiElements.formExplainerLinks, 'click', event => {
      const target = event.currentTarget;
      const pageNum = target.getAttribute( 'data-page' );
      const currentPage = this.currentPage;

      if ( !DT.hasClass( target, 'disabled' ) &&
           pageNum !== currentPage ) {
        this.switchPage( currentPage, pageNum );
      }
    } );

    /* When the tab list is clicked,
     * scroll it into view and update the page UI.
     */
    DT.bindEvents( uiElements.tabList, 'click', event => {
      const selectedTab = event.currentTarget;
      const explainerType = selectedTab.querySelector( '[data-target]' )
        .getAttribute( 'data-target' );
      this.updatePageUI( selectedTab, explainerType );
      // NOTE: Do we need to scroll here?
      scrollTo(
        uiElements.tabList[0].getBoundingClientRect().top +
        window.pageYOffset,
        {
          duration: 300,
          offset: -30
        }
      );
    } );

    /* When the mouse is over the image overlay or form explainer,
     * update the hover styles.
     */
    DT.bindEvents(
      '.image-map_overlay, .o-expandable__form-explainer',
      [ 'mouseenter', 'mouseleave' ],
      event => {
        event.preventDefault();
        this.updateAttention( event.target, CSS.HOVER_HAS_ATTENTION );
      }
    );

    /* When a form explainer expandable target has the focus,
     * update the image overlay.
     */
    DT.bindEvents(
      '.o-expandable_target',
      'focus',
      event => {
        const expandable = closest(
          event.target,
          '.o-expandable__form-explainer'
        );
        this.updateAttention( expandable, CSS.HOVER_HAS_ATTENTION );
      }
    );

    /* When an overlay is clicked, toggle the corresponding expandable
     * and scroll the page until it is in view.
     */
    DT.bindEvents(
      '.image-map_overlay',
      'click',
      event => {
        event.preventDefault();
        event.stopPropagation();
        const imageOverlay = event.target;
        const itemID = imageOverlay.getAttribute( 'href' );
        const targetExpandable = DT.getEl( itemID );

        this.openAndScrollToExpandable( imageOverlay, targetExpandable );
      }
    );

    /* When a form explainer expandable is clicked / pressed,
     * update the image overlay position and hover styles.
     */
    DT.bindEvents(
      '.o-expandable__form-explainer .o-expandable_target',
      [ 'click', 'keypress' ],
      event => {
        if ( event.which === 13 || event.type === 'click' ) {
          const target = event.target;
          const closestFormExplainer = closest(
            target, '.o-expandable__form-explainer'
          );

          this.updateAttention( closestFormExplainer, CSS.HAS_ATTENTION );
        }
      }
    );
  }
}

export default FormExplainer;
