<?php
declare(strict_types=1);

// UrantiaPapers SDK base feature

class UrantiaPapersBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UrantiaPapersContext $ctx, array $options): void {}
    public function PostConstruct(UrantiaPapersContext $ctx): void {}
    public function PostConstructEntity(UrantiaPapersContext $ctx): void {}
    public function SetData(UrantiaPapersContext $ctx): void {}
    public function GetData(UrantiaPapersContext $ctx): void {}
    public function GetMatch(UrantiaPapersContext $ctx): void {}
    public function SetMatch(UrantiaPapersContext $ctx): void {}
    public function PrePoint(UrantiaPapersContext $ctx): void {}
    public function PreSpec(UrantiaPapersContext $ctx): void {}
    public function PreRequest(UrantiaPapersContext $ctx): void {}
    public function PreResponse(UrantiaPapersContext $ctx): void {}
    public function PreResult(UrantiaPapersContext $ctx): void {}
    public function PreDone(UrantiaPapersContext $ctx): void {}
    public function PreUnexpected(UrantiaPapersContext $ctx): void {}
}
