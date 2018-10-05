import { createSubscription } from 'create-subscription';

const ControllerSubscription = createSubscription({
  getCurrentValue: controller => controller.state,
  subscribe: (controller, callback) => {
    const subscription = controller.changes.subscribe(callback);
    return () => subscription.unsubscribe();
  },
});

export default ControllerSubscription;
