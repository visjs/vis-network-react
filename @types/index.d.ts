import type { CSSProperties, FC } from 'react';
import type { Edge, Node, NetworkEvents, Options, Network } from "vis-network/peer"

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

export interface VisNetworkReactProps {
  data: {
    nodes: Node[]
    edges: Edge[]
  }
  style?: CSSProperties
  options?: Options
  events?: PartialRecord<NetworkEvents, (params?: any) => void>
  getNetwork?: (network: Network) => void,
  getNodes?: (nodes: Node[]) => void,
  getEdges?: (nodes: Edge[]) => void,
}

declare const VisNetworkReact: FC<VisNetworkReactProps>

export default VisNetworkReact;