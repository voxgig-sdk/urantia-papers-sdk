<?php
declare(strict_types=1);

// UrantiaPapers SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UrantiaPapersMakeContext
{
    public static function call(array $ctxmap, ?UrantiaPapersContext $basectx): UrantiaPapersContext
    {
        return new UrantiaPapersContext($ctxmap, $basectx);
    }
}
