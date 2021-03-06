<?php 
/**
 * Apocrypha Theme Single Forum Template
 * Andrew Clayton
 * Version 1.0.0
 * 8-10-2013
 */
?>

<?php get_header(); ?>
	<div id="content" class="no-sidebar" role="main">
		<?php apoc_breadcrumbs(); ?>
		
		<header id="forum-header" class="entry-header <?php page_header_class(); ?>">
			<h1 class="entry-title"><?php bbp_forum_title(); ?></h1>
			<p class="entry-byline"><?php bbp_forum_content(); ?></p>
			<div class="forum-actions">
				<a class="forum-create-topic button downtobottom" href="#respond"><i class="icon-pencil"></i>Create Topic</a>
				<?php bbp_forum_subscription_link(); ?>
				<?php apoc_get_search_form( 'topic' ); ?>
			</div>
		</header>		
		
		<div id="forums">

			<?php do_action( 'bbp_template_notices' ); ?>
			
			<?php if ( bbp_user_can_view_forum() ) : ?>
				<?php bbp_get_template_part( 'content', 'single-forum' ); ?>
			<?php else : ?>
				<p class="notice warning">You do not have access to view this forum.</p>
			<?php endif; ?>
		
		</div><!-- #forums -->			
	</div><!-- #content -->
	
	<?php if ( !bbp_is_forum_category() ) : ?>
	<div id="respond" class="create-topic">
		<?php bbp_get_template_part( 'form', 'topic' ); ?>
	</div><!-- #respond -->
	<?php endif; ?>	
<?php get_footer(); ?>