"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function TrackingLab() {
  const [statuses, setStatuses] = useState({
    view_item: null,
    add_to_cart: null,
    begin_checkout: null,
    purchase: null,
  });

  const mockItem = {
    item_id: "website_starter",
    item_name: "Website Design Starter Package",
    item_category: "Web Development",
    price: 15000,
    quantity: 1,
  };

  const pushToDataLayer = (eventName, eventData) => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ecommerce: eventData,
      });

      // Show confirmation message
      setStatuses((prev) => ({
        ...prev,
        [eventName]: `Pushed ${eventName} to dataLayer`,
      }));

      // Clear message after 3 seconds
      setTimeout(() => {
        setStatuses((prev) => ({
          ...prev,
          [eventName]: null,
        }));
      }, 3000);
    }
  };

  const handleViewItem = () => {
    pushToDataLayer("view_item", {
      currency: "BDT",
      value: mockItem.price,
      items: [mockItem],
    });
  };

  const handleAddToCart = () => {
    pushToDataLayer("add_to_cart", {
      currency: "BDT",
      value: mockItem.price,
      items: [mockItem],
    });
  };

  const handleBeginCheckout = () => {
    pushToDataLayer("begin_checkout", {
      currency: "BDT",
      value: mockItem.price,
      items: [mockItem],
    });
  };

  const handlePurchase = () => {
    pushToDataLayer("purchase", {
      transaction_id: "TEST-" + Date.now(),
      currency: "BDT",
      value: mockItem.price,
      tax: 0,
      shipping: 0,
      items: [mockItem],
    });
  };

  return (
    <main className="min-h-screen bg-surface-dark">
      {/* Hero Spacer */}
      <div className="h-screen" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 bg-surface-dark py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading text-text-inverse mb-4">
              Tracking Lab
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Practice GTM e-commerce events safely without affecting the real website flow.
            </p>
          </div>

          {/* Mock Service Card */}
          <div className="max-w-2xl">
            <div className="bg-neutral-white rounded-xl border border-border p-8 hover:shadow-lg transition-shadow duration-[var(--transition-base)]">
              {/* Card Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-text-primary mb-2">
                  {mockItem.item_name}
                </h2>
                <p className="text-sm text-text-secondary mb-4">{mockItem.item_category}</p>
              </div>

              {/* Price Section */}
              <div className="mb-8 py-6 border-t border-b border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    ৳{mockItem.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-text-tertiary">BDT</span>
                </div>
                <p className="text-sm text-text-tertiary mt-2">Quantity: {mockItem.quantity}</p>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-8">
                This is a mock service package for testing GTM e-commerce data layer events. Each button below will push the corresponding event to your dataLayer.
              </p>

              {/* Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleViewItem}
                    variant="primary"
                    className="w-full"
                  >
                    View Item
                  </Button>
                  {statuses.view_item && (
                    <p className="text-xs text-success font-medium">
                      ✓ {statuses.view_item}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleAddToCart}
                    variant="primary"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                  {statuses.add_to_cart && (
                    <p className="text-xs text-success font-medium">
                      ✓ {statuses.add_to_cart}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleBeginCheckout}
                    variant="secondary"
                    className="w-full"
                  >
                    Begin Checkout
                  </Button>
                  {statuses.begin_checkout && (
                    <p className="text-xs text-success font-medium">
                      ✓ {statuses.begin_checkout}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handlePurchase}
                    variant="accent"
                    className="w-full"
                  >
                    Purchase
                  </Button>
                  {statuses.purchase && (
                    <p className="text-xs text-success font-medium">
                      ✓ {statuses.purchase}
                    </p>
                  )}
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-primary-lightest rounded-lg border border-primary-light">
                <p className="text-sm text-primary-darkest">
                  <strong>Dev Note:</strong> Open your browser's DevTools Console to inspect the dataLayer array. Each button push adds an event object with the ecommerce data structure.
                </p>
              </div>
            </div>
          </div>

          {/* Data Layer Info */}
          <div className="mt-16 max-w-2xl">
            <h3 className="text-xl font-semibold text-text-inverse mb-4">
              How It Works
            </h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0">1</span>
                <span>Click any button above to push an event to the dataLayer</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0">2</span>
                <span>Check your browser console: <code className="bg-neutral-900 text-primary-light px-2 py-1 rounded text-xs">console.log(window.dataLayer)</code></span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0">3</span>
                <span>Your GTM container will detect these events and can trigger tags accordingly</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0">4</span>
                <span>This page is hidden from navigation—only accessible via direct URL: <code className="bg-neutral-900 text-primary-light px-2 py-1 rounded text-xs">/tracking-lab</code></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
