class Reclamacao:
    def __init__(self, url, texto, titulo, local, data_hora, status, problem_type, product_type, category, resposta_empresa=None, replica_usuario=None):
        self.url = url
        self.texto = texto
        self.titulo = titulo
        self.local = local
        self.data_hora = data_hora
        self.status = status
        self.problem_type = problem_type
        self.product_type = product_type
        self.category = category
        self.resposta_empresa = resposta_empresa  # Novo campo
        self.replica_usuario = replica_usuario  # Novo campo

    def to_dict(self):
        return vars(self)
