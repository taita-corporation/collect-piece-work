import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { StoreContext } from '../context/store-context';
import { LineItem } from '../components/line-item';
import { formatPrice } from '../utils/format-price';
import * as s from './cart.module.less';

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
            <h1 className={s.title}>バッグ</h1>
            {checkout.lineItems.map((item) => (
              <LineItem item={item} key={item.id} />
            ))}
            <hr />
            <table className={s.table}>
              <tbody className={s.tbody}>
                <tr>
                  <td className={s.labelColumn}>合計：</td>
                  <td className={s.totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount,
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={s.labelColumn}>送料：</td>
                  <td>配送先によって異なります</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={s.checkoutButton}
              type="submit"
            >
              お支払い手続きに進む
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
