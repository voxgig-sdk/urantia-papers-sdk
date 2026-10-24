<?php
declare(strict_types=1);

// UrantiaPapers SDK exists test

require_once __DIR__ . '/../urantiapapers_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = UrantiaPapersSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
