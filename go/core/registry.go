package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAudioEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewBibleEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewCitationEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewEmbeddingEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewEntityEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewFeedbackEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewLanguageEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewOgnEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewPaperEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewParagraphEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewQuoteEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewScriptureEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewSearchEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewTableOfContentEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewToolEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

var NewWorkEntityFunc func(client *UrantiaPapersSDK, entopts map[string]any) UrantiaPapersEntity

