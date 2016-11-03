'use strict';

export const BTN_DELETE = '.card button.remove-btn';
export const DELETE_CONFIRMATION = '.delete-confirmation-btn';
export const CART_EMPTY = '.text-xs-center h1';
export const CART_ITEMS = '.card';
export const ITEM_QUANTITY = '.quantity';
export const NUMBER_OF_ITEMS = '.number-of-items';
export const SHIPPING_COST = '.shipping-cost';
export const TAX_TOTAL = '.tax-total';
export const SUB_TOTAL = '.sub-total';

const basePath = '/cart';

// Pseudo private methods
function createCssNthCartRow(idx) {
    return CART_ITEMS + ':nth-child(' + idx + ')';
}

export function createCssNthLineItem(itemIdx, attrIdx) {
    var LINE_ITEM = ' .line-item-attributes';
    var selector = '.card:nth-child(' + itemIdx + ')' + LINE_ITEM + ':nth-child(' + attrIdx + ')';
    return browser.getText(selector);
}

// Public methods
export function navigateTo() {
    return browser.url(basePath);
}

export function verifyCartEmpty() {
    return browser.getText(CART_EMPTY);
}

export function getItemList() {
    return browser
        .waitForExist(CART_ITEMS, 5000)
        .elements(CART_ITEMS);
}

export function getItemNameByRow(rowNum) {
    let selector = createCssNthCartRow(rowNum) + ' .line-item-name';
    return browser.waitForVisible(selector)
        .getText(selector);
}

// get the quantity in Cart for a particular product line item
export function getQuantityByRow(rowNum) {
    var selector = [createCssNthCartRow(rowNum), ITEM_QUANTITY].join(' ');
    return browser.getValue(selector);
}

export function updateQuantityByRow(rowNum, value) {
    let selector = [createCssNthCartRow(rowNum), ITEM_QUANTITY].join(' ');
    return browser.waitForVisible(selector)
        .selectByVisibleText(selector, value)
        .pause(1000)
        .getValue(selector);
}

export function getEachPriceByRow(rowNum) {
    let selector = createCssNthCartRow(rowNum) + ' .line-item-price:nth-child(1)';

    return browser.getText(selector)
        .then(lineItemPrices => {
            return lineItemPrices[0];
        });
}

export function getTotalPriceByRow(rowNum) {
    let selector = createCssNthCartRow(rowNum) + ' .line-item-price:nth-child(1)';

    return browser.getText(selector)
        .then(lineItemPrices => {
            return lineItemPrices[1];
        });
}

/**
 * click on the deleteButton one more time if the first
 * click didn't work.
 * @param {string} deleteButton
 * @param {string} deleteConfirmation
 * @returns {Promise.<TResult>|*}
 */
function clickDeleteButton(deleteButton, deleteConfirmation) {
    return browser.click(deleteButton)
        .waitForVisible(deleteConfirmation, 3000)
        .isVisible(deleteConfirmation)
        .then(isVisible => {
            if (!isVisible) {
                return browser.click(deleteButton);
            }
            return Promise.resolve();
        });
}

/**
 * Find the selector that applicable to the current screen
 * @param {string} selector
 * @returns {Promise.<TResult>|*}
 */
function getDeleteItemSelector(selector) {
    return browser.isVisible(selector)
        .then(isVisible => {
            if (Array.isArray(isVisible)) {
                if (isVisible[0] === true) {
                    return selector;
                }
                return selector + '-lg';
            } else if (isVisible) {
                return selector;
            }
            return selector + '-lg';
        });
}

/**
 *
 * @param {string} deleteButton
 * @returns {Promise.<*>}
 */
function removeItemFromCart(deleteButton) {
    return clickDeleteButton(deleteButton, DELETE_CONFIRMATION)
        .then(() => browser.click(DELETE_CONFIRMATION))
        .then(() => browser.waitForVisible('.modal', 3000, true))
        .then(() => browser.pause(2000));
}

/**
 * Redirects the browser to the Cart page and empties the Cart.
 *
 */
export function emptyCart() {
    var mySelector;
    return navigateTo()
        .then(() => getDeleteItemSelector(BTN_DELETE))
        .then(selector => {
            mySelector = selector;
            return browser.elements(mySelector);
        })
        .then(removeLinks => {
            return removeLinks.value.reduce(function (prev) {
                return prev.then(function () {
                    return removeItemFromCart(mySelector);
                });
            }, Promise.resolve());
        });
}