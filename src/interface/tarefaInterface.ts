export interface CreateTarefaDTO {
  usuario_id: number;
  titulo: string;
  descricao: string;
  data_hora: string;
  prioridade: string;
}

export interface listTarefas {
  usuario_id: number;
  tipoListagem: "prioridade" | "data" | "concluida";
}

export interface Tarefa {
  id: number;
  concluida: boolean;
}

export interface updateTarefa {
  usuario_id: number;
  id: number;
  titulo?: string;
  descricao?: string;
  data_hora?: Date;
  prioridade?: number;
}

export interface deleteTarefa {
  usuario_id: number;
  id: number;
}
