// Live requests per engine. An engine is either one parameter set or a list of named ones:
// the first entry is the `base` case (the fewest parameters needed for a valid response, and the
// one other engines chain tokens off), followed by combinations that exercise the rest.
//
// `full` sends every parameter an engine accepts at once. Where parameters cannot be combined —
// the API rejects the pair, or one supersedes the other — an extra case covers them and says why.
//
// zero_retention is deliberately absent: it needs an account with zero data retention enabled and
// otherwise answers 403 on every engine that carries it.

const expression = (value) => ({ expression: value });
const from = (engine, lookup) => ({ from: engine, ...lookup });
const inDays = (days) => expression(`{{ $now.plus({ days: ${days} }).toFormat('yyyy-MM-dd') }}`);
const agoDays = (days) => expression(`{{ $now.minus({ days: ${days} }).toFormat('yyyy-MM-dd') }}`);
const agoUS = (days) => expression(`{{ $now.minus({ days: ${days} }).toFormat('MM/dd/yyyy') }}`);

const UULE = 'w+CAIQICINVW5pdGVkIFN0YXRlcw==';
const MULTI_CITY = expression(
	'{{ JSON.stringify([' +
		"{ departure_id: 'JFK', arrival_id: 'LHR', outbound_date: $now.plus({ days: 45 }).toFormat('yyyy-MM-dd') }," +
		"{ departure_id: 'LHR', arrival_id: 'CDG', outbound_date: $now.plus({ days: 52 }).toFormat('yyyy-MM-dd') }]) }}",
);

export default {
	// ── Google ──────────────────────────────────────────────────────────────────
	google: [
		{ params: { q: 'car insurance quotes', optimization_strategy: 'ads' } },
		{
			name: 'full',
			params: {
				q: 'coffee machines',
				device: 'mobile',
				location: 'London,England,United Kingdom',
				gl: 'gb',
				cr: 'gb',
				hl: 'es',
				lr: 'lang_es',
				filter: '0',
				nfpr: '1',
				safe: 'off',
				time_period: 'last_year',
				verbatim: 'true',
				include_redirect_link: 'true',
				page: 2,
				num: 10,
				optimization_strategy: 'performance',
			},
		},
		// kgmid replaces the query, uule replaces location, a custom range replaces time_period.
		{ name: 'kgmid', params: { kgmid: '/m/02_286', gl: 'gb', hl: 'es' } },
		{ name: 'uule', params: { q: 'coffee machines', uule: UULE } },
		{ name: 'date-range', params: { q: 'coffee machines', time_period_min: agoUS(365), time_period_max: agoUS(30) } },
	],

	google_images: [
		{ params: { q: 'golden retriever puppies' } },
		{
			name: 'full',
			params: {
				q: 'golden retriever puppies',
				device: 'tablet',
				location: 'London,England,United Kingdom',
				gl: 'gb',
				cr: 'gb',
				hl: 'es',
				lr: 'lang_es',
				aspect_ratio: 'wide',
				nfpr: '1',
				color: 'blue',
				filter: '0',
				image_type: 'photo',
				safe: 'off',
				size: 'large',
				time_period: 'last_year',
				usage_rights: 'creative_commons_licenses',
				page: 2,
			},
		},
		// tbs encodes the same filters the individual parameters set; uule replaces location.
		{ name: 'tbs', params: { q: 'golden retriever puppies', tbs: 'isz:l' } },
		{ name: 'uule', params: { q: 'golden retriever puppies', uule: UULE } },
		{
			name: 'paged',
			params: { q: 'golden retriever puppies', next_page_token: from('google_images', { key: 'next_page_token' }) },
		},
	],

	google_maps: [
		{ params: { q: 'coffee' } },
		{ name: 'full', params: { q: 'coffee', ll: '@51.5074,-0.1278,14z', gl: 'gb', hl: 'es', page: 2 } },
	],

	google_shopping: [
		{ params: { q: 'espresso machine' } },
		{
			name: 'full',
			params: {
				q: 'espresso machine',
				gl: 'de',
				hl: 'es',
				location: 'Berlin,Berlin,Germany',
				condition: 'new',
				include_favicon: true,
				is_free_delivery: true,
				is_on_sale: true,
				is_small_business: true,
				price_max: '500',
				price_min: '25',
				sort_by: 'price_low_to_high',
				page: 2,
			},
		},
		// shoprs supersedes the individual filters; base64 images balloon the response.
		{
			name: 'shoprs',
			params: { q: 'espresso machine', shoprs: 'CAEYFyoDcHM1MhwIFxISUHJpY2U6IGxvdyB0byBoaWdoKgQQARgBYAKIAQE' },
		},
		{ name: 'uule', params: { q: 'espresso machine', uule: UULE } },
		{ name: 'base-images', params: { q: 'espresso machine', include_base_images: true } },
	],

	google_shopping_autocomplete: [
		{ params: { q: 'espresso mach' } },
		{ name: 'full', params: { q: 'espresso mach', cp: 5, gl: 'gb', hl: 'es' } },
	],

	google_shopping_filters: {
		all_filters_token: from('google_shopping', { path: 'all_filters_token' }),
	},

	google_rank_tracking: [
		{ params: { q: 'best running shoes' } },
		{
			name: 'full',
			params: {
				q: 'best running shoes',
				device: 'mobile',
				location: 'London,England,United Kingdom',
				gl: 'gb',
				hl: 'es',
				lr: 'lang_es',
				num: 20,
				safe: 'off',
			},
		},
		// page walks a fixed 10-result window, so it does not mix with a custom num.
		{ name: 'paged', params: { q: 'best running shoes', page: 2 } },
		{ name: 'uule', params: { q: 'best running shoes', uule: UULE } },
	],

	google_news: [
		{ params: { q: 'climate change' } },
		{
			name: 'full',
			params: {
				q: 'climate change',
				device: 'mobile',
				location: 'London,England,United Kingdom',
				gl: 'gb',
				cr: 'gb',
				hl: 'de',
				lr: 'lang_de',
				filter: '0',
				nfpr: '1',
				sort_by: 'most_recent',
				time_period: 'last_week',
				num: 10,
				page: 2,
			},
		},
		{ name: 'uule', params: { q: 'climate change', uule: UULE } },
		{ name: 'date-range', params: { q: 'climate change', time_period_min: agoUS(365), time_period_max: agoUS(30) } },
	],

	google_jobs: [
		{ params: { q: 'software engineer' } },
		{
			name: 'full',
			params: {
				q: 'software engineer',
				location: 'London,England,United Kingdom',
				gl: 'gb',
				hl: 'es',
				lrad: 50,
				ltype: '1',
				page: 2,
			},
		},
		{ name: 'uule', params: { q: 'software engineer', uule: UULE } },
		{
			name: 'paged',
			params: { q: 'software engineer', next_page_token: from('google_jobs', { key: 'next_page_token' }) },
		},
	],

	// ── Google Maps family ──────────────────────────────────────────────────────
	google_maps_place: [
		{ params: { place_id: from('google_maps', { path: 'local_results?.[0]?.place_id' }) } },
		{
			name: 'full',
			params: { place_id: from('google_maps', { path: 'local_results?.[0]?.place_id' }), gl: 'gb', hl: 'es' },
		},
		{ name: 'data-id', params: { data_id: from('google_maps', { path: 'local_results?.[0]?.data_id' }) } },
	],

	google_maps_reviews: [
		{ params: { place_id: from('google_maps', { path: 'local_results?.[0]?.place_id' }) } },
		{
			name: 'full',
			params: {
				place_id: from('google_maps', { path: 'local_results?.[0]?.place_id' }),
				sort_by: 'newest',
				gl: 'gb',
				hl: 'es',
				num: 20,
			},
		},
		{ name: 'data-id', params: { data_id: from('google_maps', { path: 'local_results?.[0]?.data_id' }) } },
		{
			name: 'paged',
			params: {
				place_id: from('google_maps', { path: 'local_results?.[0]?.place_id' }),
				next_page_token: from('google_maps_reviews', { key: 'next_page_token' }),
			},
		},
	],

	google_maps_photos: [
		{ params: { place_id: from('google_maps', { path: 'local_results?.[0]?.place_id' }) } },
		{ name: 'data-id', params: { data_id: from('google_maps', { path: 'local_results?.[0]?.data_id' }) } },
		{
			name: 'paged',
			params: {
				place_id: from('google_maps', { path: 'local_results?.[0]?.place_id' }),
				next_page_token: from('google_maps_photos', { key: 'next_page_token' }),
			},
		},
	],

	google_maps_directions: [
		{ params: { from: 'London Eye, London', to: 'Tower Bridge, London' } },
		{
			name: 'driving',
			params: {
				from: 'London Eye, London',
				to: 'Tower Bridge, London',
				travel_mode: 'driving',
				avoid: ['tolls', 'highways'],
				distance_units: 'km',
				waypoints: '["Buckingham Palace, London"]',
				gl: 'gb',
				hl: 'es',
			},
		},
		// prefer and route only apply to transit; a departure time is rejected with waypoints.
		{
			name: 'transit',
			params: {
				from: 'London Eye, London',
				to: 'Tower Bridge, London',
				travel_mode: 'transit',
				prefer: ['bus', 'subway'],
				route: 'fewer_transfers',
			},
		},
		{
			name: 'depart-at',
			params: {
				from: 'London Eye, London',
				to: 'Tower Bridge, London',
				time: expression("{{ 'depart_at:' + Math.floor($now.plus({ days: 1 }).toSeconds()) }}"),
			},
		},
	],

	// ── Google Ads Transparency Center ──────────────────────────────────────────
	google_ads_transparency_center: [
		{ params: { domain: 'google.com' } },
		{
			name: 'full',
			params: {
				domain: 'google.com',
				ad_format: 'video',
				platform: 'youtube',
				region: 'GB',
				time_period: 'last_30_days',
				num: 20,
			},
		},
		// advertiser_id replaces domain.
		{
			name: 'advertiser',
			params: {
				advertiser_id: from('google_ads_transparency_center', { path: 'ad_creatives?.[0]?.advertiser?.id' }),
			},
		},
		{
			name: 'paged',
			params: {
				domain: 'google.com',
				next_page_token: from('google_ads_transparency_center', { key: 'next_page_token' }),
			},
		},
	],

	google_ads_transparency_center_advertiser_search: [
		{ params: { q: 'nike' } },
		{ name: 'full', params: { q: 'nike', num_advertisers: 5, num_domains: 5, region: 'GB' } },
	],

	google_ads_transparency_center_ad_details: {
		advertiser_id: from('google_ads_transparency_center', { path: 'ad_creatives?.[0]?.advertiser?.id' }),
		creative_id: from('google_ads_transparency_center', { path: 'ad_creatives?.[0]?.id' }),
	},

	google_ads_advertiser_info: {
		advertiser_info_token: from('google', { key: 'advertiser_info_token' }),
	},

	// ── Google Flights ──────────────────────────────────────────────────────────
	google_flights: [
		{ params: { departure_id: 'JFK', arrival_id: 'LHR', outbound_date: inDays(45), return_date: inDays(52) } },
		{
			name: 'full',
			params: {
				departure_id: 'JFK',
				arrival_id: 'LHR',
				outbound_date: inDays(45),
				return_date: inDays(52),
				gl: 'gb',
				currency: 'EUR',
				hl: 'es',
				carry_on_bags: 1,
				checked_bags: 1,
				emissions: '1',
				included_airlines: 'ONEWORLD',
				included_connecting_airports: 'AMS',
				layover_duration_max: 600,
				layover_duration_min: 60,
				max_flight_duration: 1500,
				max_price: 4000,
				outbound_times: '4,18,2,18',
				return_times: '4,18,2,18',
				separate_tickets: '1',
				show_cheapest_flights: 'true',
				show_hidden_flights: 'true',
				expanded_search: 'true',
				sort_by: 'price',
				stops: 'one_stop_or_fewer',
				travel_class: 'business',
				flight_type: 'round_trip',
				adults: 2,
				children: 1,
				infants_in_seat: 1,
				infants_on_lap: 1,
			},
		},
		// Excluding airlines cancels out including them; a multi-city itinerary replaces the
		// point-to-point one.
		{
			name: 'excluded',
			params: {
				departure_id: 'JFK',
				arrival_id: 'LHR',
				outbound_date: inDays(45),
				return_date: inDays(52),
				excluded_airlines: 'SPIRIT',
				excluded_connecting_airports: 'CDG',
			},
		},
		{ name: 'multi-city', params: { flight_type: 'multi_city', multi_city_json: MULTI_CITY, currency: 'EUR' } },
		{
			name: 'departure-token',
			params: {
				departure_id: 'JFK',
				arrival_id: 'LHR',
				outbound_date: inDays(45),
				return_date: inDays(52),
				departure_token: from('google_flights', { key: 'departure_token' }),
			},
		},
		{
			name: 'booking-token',
			params: {
				departure_id: 'JFK',
				arrival_id: 'LHR',
				outbound_date: inDays(45),
				return_date: inDays(52),
				booking_token: from('google_flights', { key: 'booking_token' }),
			},
		},
	],

	google_flights_calendar: [
		{ params: { departure_id: 'JFK', arrival_id: 'LHR', outbound_date: inDays(45), return_date: inDays(52) } },
		{
			name: 'full',
			params: {
				departure_id: 'JFK',
				arrival_id: 'LHR',
				outbound_date: inDays(45),
				return_date: inDays(52),
				outbound_date_start: inDays(40),
				outbound_date_end: inDays(50),
				return_date_start: inDays(55),
				return_date_end: inDays(62),
				carry_on_bags: 1,
				checked_bags: 1,
				emissions: '1',
				included_airlines: 'ONEWORLD',
				included_connecting_airports: 'AMS',
				layover_duration_max: 600,
				layover_duration_min: 60,
				max_flight_duration: 1500,
				max_price: 4000,
				outbound_times: '4,18,2,18',
				return_times: '4,18,2,18',
				separate_tickets: '1',
				stops: 'one_stop_or_fewer',
				travel_class: 'business',
				flight_type: 'round_trip',
				adults: 2,
				children: 1,
				infants_in_seat: 1,
				infants_on_lap: 1,
				gl: 'gb',
				currency: 'EUR',
				hl: 'es',
			},
		},
		{
			name: 'excluded',
			params: {
				departure_id: 'JFK',
				arrival_id: 'LHR',
				outbound_date: inDays(45),
				return_date: inDays(52),
				excluded_airlines: 'SPIRIT',
				excluded_connecting_airports: 'CDG',
			},
		},
	],

	google_flights_location_search: [
		{ params: { q: 'Lond' } },
		{ name: 'full', params: { q: 'Lond', hl: 'en-GB', search_type: 'arrival' } },
	],

	// ── Google Hotels ───────────────────────────────────────────────────────────
	google_hotels: [
		{ params: { q: 'Lisbon', check_in_date: inDays(30), check_out_date: inDays(33) } },
		{
			name: 'full',
			params: {
				q: 'Lisbon',
				check_in_date: inDays(30),
				check_out_date: inDays(33),
				gl: 'gb',
				currency: 'EUR',
				hl: 'es',
				price_max: 900,
				price_min: 40,
				property_type: 'vacation_rental',
				rating: '8',
				sort_by: 'highest_rating',
				eco_certified: true,
				free_cancellation: true,
				special_offers: true,
				hotel_class: '4',
				bathrooms: 1,
				bedrooms: 1,
				adults: 3,
			},
		},
		// Amenity ids, property_types, children_ages and brands are hotel-only.
		{
			name: 'hotel',
			params: {
				q: 'Lisbon',
				check_in_date: inDays(30),
				check_out_date: inDays(33),
				property_type: 'hotel',
				amenities: '35',
				property_types: '2',
				children_ages: '5,9',
				adults: 3,
				brands: from('google_hotels', { path: 'brands?.[0]?.id' }),
			},
		},
		// bounding_box replaces q.
		{
			name: 'bounding-box',
			params: { check_in_date: inDays(30), check_out_date: inDays(33), bounding_box: '[-9.23,38.68,-9.09,38.79]' },
		},
		{
			name: 'displaced',
			params: { q: 'Warsaw', check_in_date: inDays(30), check_out_date: inDays(33), for_displaced_individuals: true },
		},
		{
			name: 'paged',
			params: {
				q: 'Lisbon',
				check_in_date: inDays(30),
				check_out_date: inDays(33),
				next_page_token: from('google_hotels', { key: 'next_page_token' }),
			},
		},
	],

	google_hotels_property: [
		{
			params: {
				property_token: from('google_hotels', { path: 'properties?.[0]?.property_token' }),
				check_in_date: inDays(30),
				check_out_date: inDays(33),
			},
		},
		{
			name: 'full',
			params: {
				property_token: from('google_hotels', { path: 'properties?.[0]?.property_token' }),
				check_in_date: inDays(30),
				check_out_date: inDays(33),
				gl: 'GB',
				currency: 'EUR',
				hl: 'en-GB',
				expanded_search: true,
				free_cancellation: true,
				adults: 3,
				children_ages: '5,9',
			},
		},
	],

	google_hotels_autocomplete: [{ params: { q: 'Lisb' } }, { name: 'full', params: { q: 'Lisb', hl: 'en-GB' } }],

	// ── YouTube ─────────────────────────────────────────────────────────────────
	youtube: [
		{ params: { q: 'cooking tutorials' } },
		{ name: 'full', params: { q: 'cooking tutorials', gl: 'GB', hl: 'es' } },
		{ name: 'paged', params: { q: 'cooking tutorials', sp: from('youtube', { key: 'next_page_token' }) } },
	],

	youtube_video: [
		{ params: { video_id: from('youtube', { path: 'videos?.[0]?.id' }) } },
		{ name: 'full', params: { video_id: from('youtube', { path: 'videos?.[0]?.id' }), gl: 'GB', hl: 'es' } },
	],

	youtube_channel: [
		{ params: { channel_id: '@TED' } },
		{ name: 'full', params: { channel_id: '@TED', gl: 'GB', hl: 'es' } },
	],

	youtube_channel_videos: [
		{ params: { channel_id: '@TED' } },
		{ name: 'full', params: { channel_id: '@TED', gl: 'GB', hl: 'es' } },
		{
			name: 'paged',
			params: { channel_id: '@TED', next_page_token: from('youtube_channel_videos', { key: 'next_page_token' }) },
		},
	],

	youtube_comments: [
		{ params: { video_id: 'Ks-_Mh1QhMc' } },
		{ name: 'full', params: { video_id: 'Ks-_Mh1QhMc', gl: 'GB', hl: 'es' } },
		{
			name: 'paged',
			params: { video_id: 'Ks-_Mh1QhMc', next_page_token: from('youtube_comments', { key: 'next_page_token' }) },
		},
	],

	youtube_transcripts: [
		{ params: { video_id: 'Ks-_Mh1QhMc' } },
		{ name: 'full', params: { video_id: 'Ks-_Mh1QhMc', lang: 'es', only_available: true, transcript_type: 'auto' } },
		{
			name: 'named',
			params: {
				video_id: 'Ks-_Mh1QhMc',
				transcript_name: from('youtube_transcripts', { path: 'available_languages?.[0]?.name' }),
			},
		},
	],

	// ── Meta Ad Library ─────────────────────────────────────────────────────────
	meta_ad_library_page_search: [
		{ params: { q: 'nike' } },
		{ name: 'full', params: { q: 'nike', country: 'GB', ad_type: 'all' } },
	],

	meta_ad_library_page_info: {
		page_id: from('meta_ad_library_page_search', { key: 'page_id' }),
	},

	meta_ad_library: [
		{ params: { q: 'running shoes' } },
		{
			name: 'full',
			params: {
				q: 'running shoes',
				content_languages: 'en',
				country: 'GB',
				active_status: 'all',
				ad_type: 'all',
				end_date: agoDays(1),
				media_type: 'video',
				platforms: 'instagram',
				sort_by: 'most_recent',
				start_date: agoDays(90),
			},
		},
		// A location filter needs all three location parameters together.
		{
			name: 'location',
			params: { q: 'running shoes', location_id: '2420379', location_name: 'London', location_type: 'CITY' },
		},
		{ name: 'page', params: { page_id: from('meta_ad_library_page_search', { key: 'page_id' }), country: 'GB' } },
		{ name: 'paged', params: { q: 'running shoes', next_page_token: from('meta_ad_library', { key: 'next_page_token' }) } },
	],

	meta_ad_library_ad_details: [
		{ params: { ad_archive_id: from('meta_ad_library', { key: 'ad_archive_id' }) } },
		{
			name: 'full',
			params: {
				ad_archive_id: from('meta_ad_library', { key: 'ad_archive_id' }),
				page_id: from('meta_ad_library', { key: 'page_id' }),
				country: 'GB',
				is_political: 'false',
			},
		},
		// ad_details_token carries the ad identity on its own.
		{ name: 'details-token', params: { ad_details_token: from('meta_ad_library', { key: 'ad_details_token' }) } },
	],

	// ── TikTok / Instagram / LinkedIn ───────────────────────────────────────────
	tiktok_profile: { username: 'therock' },
	instagram_profile: { username: 'natgeo' },

	tiktok_ads_library: [
		{ params: { q: 'fitness' } },
		{
			name: 'full',
			params: {
				q: 'fitness',
				country: 'FR',
				sort_by: 'published_date_newest_to_oldest',
				time_period: expression(
					"{{ $now.minus({ days: 180 }).toFormat('yyyy-MM-dd') + '..' + $now.toFormat('yyyy-MM-dd') }}",
				),
			},
		},
		// Searching by advertiser needs the advertiser's name alongside the id.
		{
			name: 'advertiser',
			params: { q: 'fitness', advertiser_id: from('tiktok_ads_library', { path: 'ads?.[0]?.advertiser_id' }) },
		},
		{ name: 'paged', params: { q: 'fitness', next_page_token: from('tiktok_ads_library', { key: 'next_page_token' }) } },
	],

	tiktok_ads_library_advertiser_search: { q: 'Nike' },

	tiktok_ads_library_ad_details: {
		ad_id: from('tiktok_ads_library', { path: 'ads?.[0]?.id' }),
	},

	linkedin_ad_library: [
		{ params: { q: 'saas' } },
		{ name: 'full', params: { q: 'saas', advertiser: 'Microsoft', country: 'GB', time_period: 'last_30_days' } },
		{ name: 'paged', params: { q: 'saas', next_page_token: from('linkedin_ad_library', { key: 'next_page_token' }) } },
	],

	// ── Other engines ───────────────────────────────────────────────────────────
	baidu: [
		{ params: { q: 'machine learning' } },
		{
			name: 'full',
			params: { q: 'machine learning', ct: '1', gpc: 'stf=1683108267,1714730667|stftype=1', page: 2, num: 20 },
		},
	],

	bing: [
		{ params: { q: 'machine learning models' } },
		{
			name: 'full',
			params: {
				q: 'machine learning models',
				device: 'mobile',
				lat: '51.5074',
				lon: '-0.1278',
				market_code: 'en-gb',
				language: 'de',
				filters: 'ex1:"ez3"',
				safe_search: 'strict',
				page: '2',
			},
		},
		// country_code cannot be combined with market_code; location supersedes lat/lon.
		{ name: 'country', params: { q: 'machine learning models', country_code: 'GB', language: 'de' } },
		{ name: 'location', params: { q: 'machine learning models', location: 'London,England,United Kingdom' } },
	],

	bing_news: [
		{ params: { q: 'climate change' } },
		{
			name: 'full',
			params: {
				q: 'climate change',
				device: 'mobile',
				market_code: 'en-gb',
				language: 'de',
				safe_search: 'strict',
				sort_by: 'most_recent',
				time_period: 'last_7_days',
				page: 2,
				num: 20,
			},
		},
		// category takes priority over q; country_code cannot be combined with market_code.
		{ name: 'category', params: { category: 'MaxClass', market_code: 'en-gb' } },
		{ name: 'country', params: { q: 'climate change', country_code: 'GB', language: 'de' } },
	],

	yandex: [
		{ params: { q: 'machine learning models' } },
		{
			name: 'full',
			params: {
				q: 'machine learning models',
				lang: 'en',
				location: '1095',
				yandex_domain: 'yandex.com',
				time_period: 'last_month',
				page: 2,
			},
		},
	],

	yandex_reverse_image: [
		{ params: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gray_wolf.jpg/640px-Gray_wolf.jpg' } },
		{
			name: 'crop',
			params: {
				url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gray_wolf.jpg/640px-Gray_wolf.jpg',
				crop: '0.1;0.2;0.6;0.75',
			},
		},
	],

	duckduckgo: [
		{ params: { q: 'machine learning models' } },
		{ name: 'full', params: { q: 'machine learning models', locale: 'de-de', safe: 'off', time_period: 'past_year' } },
		{
			name: 'paged',
			params: { q: 'machine learning models', next_page_token: from('duckduckgo', { key: 'next_page_token' }) },
		},
	],

	duckduckgo_light: [
		{ params: { q: 'best coffee shops' } },
		{ name: 'full', params: { q: 'best coffee shops', locale: 'de-de', time_period: 'past_year' } },
		{
			name: 'paged',
			params: { q: 'best coffee shops', next_page_token: from('duckduckgo_light', { key: 'next_page_token' }) },
		},
	],

	duckduckgo_images: [
		{ params: { q: 'golden retriever puppies' } },
		{
			name: 'full',
			params: {
				q: 'golden retriever puppies',
				locale: 'de-de',
				color: 'blue',
				image_type: 'photo',
				layout: 'wide',
				license: 'share',
				size: 'large',
				time_period: 'past_year',
			},
		},
		{
			name: 'paged',
			params: { q: 'golden retriever puppies', next_page_token: from('duckduckgo_images', { key: 'next_page_token' }) },
		},
	],

	duckduckgo_videos: [
		{ params: { q: 'cooking tutorials' } },
		{
			name: 'full',
			params: {
				q: 'cooking tutorials',
				locale: 'de-de',
				duration: 'medium',
				license: 'creative_common',
				resolution: 'high',
				time_period: 'past_year',
			},
		},
		{
			name: 'paged',
			params: { q: 'cooking tutorials', next_page_token: from('duckduckgo_videos', { key: 'next_page_token' }) },
		},
	],
};
