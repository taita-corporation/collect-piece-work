import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { StoreContext } from '../context/store-context';
import { LineItem } from '../components/line-item';
import { formatPrice } from '../utils/format-price';
import * as s from './cart.module.css';

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext);
  const emptyCart = checkout.lineItems.length === 0;

  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

  return (
    <Layout>
      <div className={s.wrap}>
        {emptyCart ? (
          <div className={s.emptyStateContainer}>
            <h1 className={s.emptyStateHeading}>バッグは空です</h1>
            <p>
              Looks like you haven’t found anything yet. We understand that
              sometimes it’s hard to chose — maybe this helps:
            </p>
            <Link to="/search?s=BEST_SELLING" className={s.emptyStateLink}>
              View trending products
            </Link>
          </div>
        ) : (
          <>
            <h1 className={s.title}>Your cart</h1>
            <table className={s.table}>
              <thead>
                <tr>
                  <th className={s.imageHeader}>Image</th>
                  <th className={s.productHeader}>Product</th>
                  <th className={s.collapseColumn}>Price</th>
                  <th>Qty.</th>
                  <th className={[s.totals, s.collapseColumn].join(' ')}>Total</th>
                </tr>
              </thead>
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}

                <tr className={s.summary}>
                  <td className={s.collapseColumn} />
                  <td className={s.collapseColumn} />
                  <td className={s.collapseColumn} />
                  <td className={s.labelColumn}>Subtotal</td>
                  <td className={s.totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount,
                    )}
                  </td>
                </tr>
                <tr className={s.summary}>
                  <td className={s.collapseColumn} />
                  <td className={s.collapseColumn} />
                  <td className={s.collapseColumn} />
                  <td className={s.labelColumn}>Taxes</td>
                  <td className={s.totals}>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount,
                    )}
                  </td>
                </tr>
                <tr className={s.summary}>
                  <td className={s.collapseColumn} />
                  <td className={s.collapseColumn} />
                  <td className={s.collapseColumn} />
                  <td className={s.labelColumn}>Shipping</td>
                  <td className={s.totals}>Calculated at checkout</td>
                </tr>
                <tr className={s.grandTotal}>
                  <td className={s.collapseColumn} />
                  <td className={s.collapseColumn} />
                  <td className={s.collapseColumn} />
                  <td className={s.labelColumn}>Total Price</td>
                  <td className={s.totals}>
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={s.checkoutButton}
              type="submit"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
