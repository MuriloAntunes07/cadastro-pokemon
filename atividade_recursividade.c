#include <stdio.h>
#include <stdlib.h>

long long chamadasIngenuo = 0;
long long chamadasMemo = 0;
long long movimentosHanoi = 0;

long long fibonacciIngenuo(int n) {
    chamadasIngenuo++;

    if (n <= 1) {
        return n;
    }

    return fibonacciIngenuo(n - 1) + fibonacciIngenuo(n - 2);
}

long long fibonacciMemoizado(int n, long long memoria[]) {
    chamadasMemo++;

    if (n <= 1) {
        return n;
    }

    if (memoria[n] != -1) {
        return memoria[n];
    }

    memoria[n] = fibonacciMemoizado(n - 1, memoria) + fibonacciMemoizado(n - 2, memoria);
    return memoria[n];
}

void executarFibonacciIngenuo(void) {
    int n;
    long long resultado;

    printf("Digite o valor de n: ");
    scanf("%d", &n);

    if (n < 0) {
        printf("O valor de n deve ser maior ou igual a zero.\n");
        return;
    }

    chamadasIngenuo = 0;
    resultado = fibonacciIngenuo(n);

    printf("\nFibonacci(%d) = %lld\n", n, resultado);
    printf("Total de chamadas recursivas: %lld\n", chamadasIngenuo);
}

void executarFibonacciMemoizado(void) {
    int n;
    long long resultadoIngenuo;
    long long resultadoMemo;
    long long *memoria;

    printf("Digite o valor de n: ");
    scanf("%d", &n);

    if (n < 0) {
        printf("O valor de n deve ser maior ou igual a zero.\n");
        return;
    }

    memoria = malloc((n + 1) * sizeof(long long));
    if (memoria == NULL) {
        printf("Erro ao alocar memoria.\n");
        return;
    }

    for (int i = 0; i <= n; i++) {
        memoria[i] = -1;
    }

    chamadasIngenuo = 0;
    resultadoIngenuo = fibonacciIngenuo(n);

    chamadasMemo = 0;
    resultadoMemo = fibonacciMemoizado(n, memoria);

    printf("\nFibonacci(%d) = %lld\n", n, resultadoMemo);
    printf("Chamadas da versao ingenua: %lld\n", chamadasIngenuo);
    printf("Chamadas da versao memoizada: %lld\n", chamadasMemo);

    if (resultadoIngenuo == resultadoMemo) {
        printf("As duas versoes chegaram ao mesmo resultado.\n");
    }

    free(memoria);
}

void hanoi(int discos, char origem, char destino, char auxiliar) {
    if (discos == 1) {
        movimentosHanoi++;
        printf("Mover disco 1 de %c para %c\n", origem, destino);
        return;
    }

    hanoi(discos - 1, origem, auxiliar, destino);

    movimentosHanoi++;
    printf("Mover disco %d de %c para %c\n", discos, origem, destino);

    hanoi(discos - 1, auxiliar, destino, origem);
}

void executarHanoi(void) {
    int discos;

    printf("Digite a quantidade de discos: ");
    scanf("%d", &discos);

    if (discos <= 0) {
        printf("A quantidade de discos deve ser maior que zero.\n");
        return;
    }

    movimentosHanoi = 0;

    printf("\nMovimentos para resolver as Torres de Hanoi:\n");
    hanoi(discos, 'A', 'C', 'B');

    printf("\nTotal de movimentos: %lld\n", movimentosHanoi);
}

int main(void) {
    int opcao;

    do {
        printf("\n=== Atividade Avaliativa 1 - Recursividade em C ===\n");
        printf("1 - Fibonacci recursivo sem otimizacao\n");
        printf("2 - Fibonacci recursivo com memoizacao\n");
        printf("3 - Torres de Hanoi\n");
        printf("0 - Sair\n");
        printf("Escolha uma opcao: ");
        scanf("%d", &opcao);

        switch (opcao) {
            case 1:
                executarFibonacciIngenuo();
                break;
            case 2:
                executarFibonacciMemoizado();
                break;
            case 3:
                executarHanoi();
                break;
            case 0:
                printf("Encerrando o programa.\n");
                break;
            default:
                printf("Opcao invalida.\n");
        }
    } while (opcao != 0);

    return 0;
}
