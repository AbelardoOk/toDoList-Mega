export interface CreateTarefaDTO {
  usuario_id: number;
  titulo: string;
  descricao: string;
  data_hora: string;
  prioridade: string;
}

export interface listTarefas extends CreateTarefaDTO {
  usuario_id: number;
  tipoListagem: "prioridade" | "data" | "concluida";
}

export interface Tarefa extends CreateTarefaDTO {
  id: number;
  concluida: boolean;
}
