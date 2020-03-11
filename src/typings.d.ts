/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module "*.geojson" {
  const value: any;
  export default value;
}
