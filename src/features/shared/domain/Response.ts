type SuccessResponse<S> = {
  tag: 'success';
  value: S;
};

type ErrorResponse<E> = {
  tag: 'error';
  error: E;
};

type Response<S, E> = SuccessResponse<S> | ErrorResponse<E>;

const isErrorResponse = <S, E>(response: Response<S, E>): response is ErrorResponse<E> => {
  return response.tag === 'error';
};

const successResponse = <S>(value: S): SuccessResponse<S> => {
  return { tag: 'success', value };
};

const errorResponse = <E>(error: E): ErrorResponse<E> => {
  return { tag: 'error', error };
};

export { type Response, isErrorResponse, successResponse, errorResponse };
