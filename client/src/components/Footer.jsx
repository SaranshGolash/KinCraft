import React from "react";
import KinCraftLogo from "./KinCraftLogo";
import "./Footer.css";

function Footer() {
  return (
    <footer className="kincraft-footer">
      <div className="kincraft-footer-container">
        <div className="kincraft-footer-grid">
          {/* Brand & Mission Column */}
          <div className="kincraft-footer-brand-col">
            <div className="kincraft-footer-logo-wrapper">
              <KinCraftLogo variant="dark" height={44} />
            </div>
            <p className="kincraft-footer-mission">
              KinCraft directly bridges conscious global patrons with India's
              grassroots artisan clusters. Every weave, casting, and clay vessel
              honors sacred centuries-old lineage while establishing dignified
              livelihoods and sovereign fair-trade micro-economies.
            </p>
            <div className="kincraft-pledge-card">
              <span className="material-symbols-outlined kincraft-pledge-icon">
                handshake
              </span>
              <div>
                <div className="kincraft-pledge-title">
                  Transparent 10% Commission Pledge
                </div>
                <p className="kincraft-pledge-desc">
                  90% of checkout proceeds transfer directly into verified
                  artisan cooperative bank accounts via instant escrow
                  settlement.
                </p>
              </div>
            </div>
          </div>

          {/* Column 1: Heritage & Origins */}
          <div className="kincraft-footer-col">
            <span className="kincraft-footer-heading">
              Heritage &amp; Origins
            </span>
            <a
              className="kincraft-footer-link"
              data-path="category-terracotta-pottery"
              href="#pottery"
            >
              Terracotta &amp; Pottery
            </a>
            <a
              className="kincraft-footer-link"
              data-path="category-handloom-textiles"
              href="#textiles"
            >
              Handloom Textiles
            </a>
            <a
              className="kincraft-footer-link"
              data-path="category-dhokra-bell-metal"
              href="#bell-metal"
            >
              Dhokra &amp; Bell Metal
            </a>
            <a
              className="kincraft-footer-link"
              data-path="category-woodcraft"
              href="#woodcraft"
            >
              Woodcraft
            </a>
            <a
              className="kincraft-footer-link"
              data-path="category-natural-fiber"
              href="#fiber"
            >
              Natural Fiber
            </a>
            <a
              className="kincraft-footer-link"
              data-path="gi-heritage-registry"
              href="#gi-tagged"
            >
              GI Tag Registry
            </a>
          </div>

          {/* Column 2: Artisan Collective */}
          <div className="kincraft-footer-col">
            <span className="kincraft-footer-heading">Artisan Collective</span>
            <a
              className="kincraft-footer-link"
              data-path="artisan-studio-portal"
              href="#artisan-studio"
            >
              Artisan Studio Login
            </a>
            <a
              className="kincraft-footer-link"
              data-path="lineage-stories"
              href="#stories"
            >
              Master Craftsmen Stories
            </a>
            <a
              className="kincraft-footer-link"
              data-path="craft-preservation-fund"
              href="#preservation"
            >
              Preservation Endowment
            </a>
            <a
              className="kincraft-footer-link"
              data-path="fair-trade-metrics"
              href="#fair-trade"
            >
              Fair-Trade Audit Ledger
            </a>
            <a
              className="kincraft-footer-link"
              data-path="cluster-locator"
              href="#directory"
            >
              Artisan Village Directory
            </a>
          </div>

          {/* Column 3: Governance & Trust */}
          <div className="kincraft-footer-col">
            <span className="kincraft-footer-heading">
              Governance &amp; Trust
            </span>
            <a
              className="kincraft-footer-link"
              data-path="quality-guarantee"
              href="#authenticity"
            >
              GI Authenticity Guarantee
            </a>
            <a
              className="kincraft-footer-link"
              data-path="shipping-returns"
              href="#logistics"
            >
              Artisan-Safe Logistics
            </a>
            <a
              className="kincraft-footer-link"
              data-path="patron-support"
              href="#support"
            >
              Customer Care &amp; Support
            </a>
            <a
              className="kincraft-footer-link"
              data-path="privacy-trust"
              href="#privacy"
            >
              Privacy &amp; Data Ethics
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="kincraft-footer-bottom">
          <div className="kincraft-footer-security">
            <span className="material-symbols-outlined">verified_user</span>
            <span>
              ISO/IEC 27001 Secure Handloom Escrow • Handcrafted with dignity
              across 28 Indian States
            </span>
          </div>
          <div className="kincraft-footer-copyright">
            © {new Date().getFullYear()} KinCraft Artisan Collective. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
