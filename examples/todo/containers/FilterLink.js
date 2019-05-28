import Link from '../components/Link';
import { connect } from '../../../src';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.filter,
});

const mapControllerToProps = (controller, ownProps) => ({
  onClick: () => {
    controller.filter.set(ownProps.filter);
  },
});

const FilterLink = connect(
  mapStateToProps,
  mapControllerToProps
)(Link);

export default FilterLink;
