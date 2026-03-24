<?php

namespace App\Doctrine;

use Doctrine\ORM\Query\AST\Functions\FunctionNode;
use Doctrine\ORM\Query\Parser;
use Doctrine\ORM\Query\SqlWalker;
use Doctrine\ORM\Query\TokenType;

class Point extends FunctionNode
{
    public $firstPoint = null;
    public $secondPoint = null;

    public function parse(Parser $parser): void {
        $parser->match(TokenType::T_IDENTIFIER);
        $parser->match(TokenType::T_OPEN_PARENTHESIS);

        $this->firstPoint = $parser->ArithmeticPrimary();
        $parser->match(TokenType::T_COMMA);
        $this->secondPoint = $parser->ArithmeticPrimary();

        $parser->match(TokenType::T_CLOSE_PARENTHESIS);
    }

    public function getSql(SqlWalker $sqlWalker): string {
        return sprintf(
            'Point(%s, %s)',
            $this->firstPoint->dispatch($sqlWalker),
            $this->secondPoint->dispatch($sqlWalker)
        );
    }
}