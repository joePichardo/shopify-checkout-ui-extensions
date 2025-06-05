import {
  reactExtension,
  Text,
  useCartLineTarget,
  useAppMetafields,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.cart-line-item.render-after',
  () => <ShippingDelayMessage />,
);

function ShippingDelayMessage() {
  const {
    merchandise: {
      product: {
        id: gid
      }
    }
  } = useCartLineTarget();

  const id = gid.split('/').pop()!;

  const [delayMessage] = useAppMetafields({
    id,
    namespace: 'shipping',
    key: 'delay_message',
    type: 'product',
  });

  if (!delayMessage) return null;

  return (
    <Text size="small" appearance="subdued">
      {delayMessage.metafield.value}
    </Text>
  );
}
