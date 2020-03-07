export interface ActionModel<P = null, T = string> {
  type: T;
  payload?: P;
}

export interface ErrorActionModel { error: string }

export const action = <Payload = null>(type: string) => (payload: Payload = null) => ({
  type,
  payload,
});
