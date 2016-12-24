'use strict';

export const QUICK_VIEW_DIALOG = '.quick-view-dialog';
export const ACTIVE_IMAGE = '.carousel-item.active .img-fluid';
export const NEXT_BUTTON = '.right.carousel-control .icon-next';
export const PRODUCT_NAME = '.product-name';
export const SELECTED_SWATCH_COLOR = '.swatch-value.selected';
export const SELECTED_SIZE = '.select-size option[selected]';
export const SELECTED_QUANTITY = 'select.quantity';
export const PRICE = '.prices div span';
export const ADD_TO_CART = '.add-to-cart';
export const CLOSE_BUTTON = '.close';


export function getProductName() {
    let selector = PRODUCT_NAME;
    return browser.waitForVisible(selector)
        .getText(selector);
}

export function getSelectedSwatchColor() {
    let selector = SELECTED_SWATCH_COLOR;
    return browser.waitForVisible(selector)
        .getAttribute(selector, 'data-attr-value');
}

export function getSelectedSizeDataAttrValue() {
    let selector = SELECTED_SIZE;
    return browser.waitForVisible(selector)
        .getAttribute(selector, 'data-attr-value');
}

export function getSelectedQuantity() {
    let selector = SELECTED_QUANTITY;
    return browser.waitForVisible(selector)
        .getValue(selector);
}

export function getPrice() {
    let selector = PRICE;
    return browser.waitForVisible(selector)
        .getText(selector);
}

export function getActiveImageSrc() {
    let selector = ACTIVE_IMAGE;
    return browser.waitForVisible(selector)
        .getAttribute(selector, 'src');
}

export function clickOnNextImgageIcon() {
    let nextBtnSelector = NEXT_BUTTON;
    return browser.waitForVisible(nextBtnSelector)
        .click(nextBtnSelector)
        .waitForVisible(ACTIVE_IMAGE);
}

export function closeQuickview() {
    let selector = CLOSE_BUTTON;
    return browser.waitForVisible(selector)
        .click(selector)
        .waitForVisible(selector, 1000, true);
}


