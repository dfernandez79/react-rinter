import controller from 'rinter';
import defaultNumbersService from './service';

export const Status = {
  LOADING: 'loading',
  LOADED: 'loaded',
  EMPTY: 'empty',
  ERROR: 'error',
};

export const createController = controller({
  initialState: { status: Status.EMPTY, error: undefined },

  initialize({ service = defaultNumbersService }) {
    this.service = service;
  },

  mutators: {
    loading: state => ({ ...state, status: Status.LOADING }),
    update: (state, number, text) => ({
      ...state,
      number,
      text,
      status: Status.LOADED,
      error: undefined,
    }),
    requestFailed: (state, reason) => ({
      ...state,
      status: Status.ERROR,
      error: reason,
    }),
  },

  methods: {
    refresh() {
      this.loading();
      this.service
        .fetchRandomNumberFacts()
        .then(({ number, text }) => this.update(number, text))
        .catch(reason => {
          this.requestFailed(reason.message);
        });
    },
  },
});
