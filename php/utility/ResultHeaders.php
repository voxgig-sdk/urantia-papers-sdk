<?php
declare(strict_types=1);

// UrantiaPapers SDK utility: result_headers

class UrantiaPapersResultHeaders
{
    public static function call(UrantiaPapersContext $ctx): ?UrantiaPapersResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
